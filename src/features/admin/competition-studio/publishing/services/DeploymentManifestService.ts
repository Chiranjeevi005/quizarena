import { DeploymentManifest, DeploymentPlan } from "../types/deployment.types";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export class DeploymentManifestService {
  /**
   * Generates and stores the DeploymentManifest based on the DeploymentPlan.
   * Links to the VersionManifest generated during the Version Build phase.
   */
  public async createManifest(
    plan: DeploymentPlan,
    versionManifestId: string,
    builderVersion: string,
    pipelineVersion: string
  ): Promise<DeploymentManifest> {
    const versionManifest = await prisma.versionManifest.findUnique({
      where: { id: versionManifestId },
    });

    if (!versionManifest) {
      throw new Error(`VersionManifest ${versionManifestId} not found.`);
    }

    const manifest: DeploymentManifest = {
      deploymentId: plan.deploymentId,
      artifactId: versionManifest.artifactId,
      stages: plan.stages.map((s) => s.stage),
      environment: plan.environment,
      dependencies: {
        schemaVersion: versionManifest.schemaVersion.toString(),
        runtimeVersion: versionManifest.runtimeVersion || "1.0.0",
        submissionVersion: versionManifest.submissionVersion || "1.0.0",
        leaderboardVersion: versionManifest.leaderboardVersion || "1.0.0",
      },
      rollbackDeploymentId: plan.rollbackStrategy === "REVERT_STATE" ? undefined : undefined, // Will be resolved if needed
      builderVersion,
      pipelineVersion,
      timestamp: new Date().toISOString(),
    };

    return manifest;
  }
}
