import {
  PrismaClient,
  DeploymentStatus,
  DeploymentStrategy,
  DeploymentEnvironment,
  DeploymentReason,
  DeploymentResult,
} from "@/generated/prisma";
import { DeploymentStateMachine } from "./DeploymentStateMachine";
import { ArtifactDeploymentResolver } from "./ArtifactDeploymentResolver";
import { DeploymentPlanner } from "./DeploymentPlanner";
import { DeploymentManifestService } from "./DeploymentManifestService";
import { DeploymentQueueService } from "./DeploymentQueueService";
import { DeploymentLockService } from "./DeploymentLockService";
import { PublishDeploymentOptions } from "../types/deployment.types";

const prisma = new PrismaClient();
const artifactResolver = new ArtifactDeploymentResolver();
const planner = new DeploymentPlanner();
const manifestService = new DeploymentManifestService();
const queueService = new DeploymentQueueService();
const lockService = new DeploymentLockService();

export class DeploymentPipeline {
  /**
   * Initializes a new deployment, locking the version, running compatibility checks,
   * generating the execution plan, and enqueueing the deployment.
   */
  public async planDeployment(options: PublishDeploymentOptions) {
    // 1. Acquire Lock
    await lockService.acquireLock(
      options.competitionId,
      options.initiatedById,
      "Deployment Planning"
    );

    try {
      // 2. Resolve Artifact (Read-Only)
      const artifactContext = await artifactResolver.resolveArtifact(options.versionId);

      // 3. Generate Plan
      const plan = await planner.generatePlan(
        options.versionId,
        options.environment,
        options.strategy
      );

      // 4. Create Manifest
      const manifest = await manifestService.createManifest(
        plan,
        artifactContext.manifest!.id,
        "1.0.0", // Builder Version
        "1.0.0" // Pipeline Version
      );

      // 5. Enqueue Deployment
      const queuePosition = await queueService.enqueue(options.versionId);

      // 6. Save Deployment to Database
      const deploymentNumber =
        (await prisma.publishDeployment.count({
          where: { competitionVersionId: options.versionId },
        })) + 1;

      const deployment = await prisma.publishDeployment.create({
        data: {
          competitionVersionId: options.versionId,
          deploymentNumber,
          status: DeploymentStatus.PLANNED,
          strategy: options.strategy,
          environment: options.environment,
          reason: options.reason,
          reasonNote: options.reasonNote,
          initiatedById: options.initiatedById,
          pipelineVersion: manifest.pipelineVersion,
          builderVersion: manifest.builderVersion,
          queuePosition,
          queuedAt: queuePosition > 0 ? new Date() : null,
          manifestId: artifactContext.manifest!.id,
          stages: {
            create: plan.stages.map((s) => ({
              stage: s.stage,
              status: "PENDING",
              retryCount: 0,
            })),
          },
          metrics: {
            create: {},
          },
          audits: {
            create: {
              action: "PLANNED",
              actorId: options.initiatedById,
              metadata: { queuePosition },
            },
          },
        },
      });

      return deployment;
    } finally {
      // Release lock for execution phase later
      const lock = await prisma.deploymentLock.findUnique({
        where: { competitionId: options.competitionId },
      });
      if (lock) {
        await lockService.releaseLock(lock.id);
      }
    }
  }
}
