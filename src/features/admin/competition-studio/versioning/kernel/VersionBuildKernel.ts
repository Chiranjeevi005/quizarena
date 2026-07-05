import { PrismaClient } from "@/generated/prisma";
import { VersionBuildPipeline, BuildContext } from "../services/VersionBuildPipeline";
import { ArtifactStatus } from "../types/artifact.types";

const prisma = new PrismaClient();

export class VersionBuildKernel {
  /**
   * Executes the full Version Build Pipeline inside an atomic transaction.
   * Transforms an editable Competition into an immutable Version Artifact.
   */
  static async executeBuild(
    competitionId: string,
    userId: string,
    semanticVersion: string,
    reason: string = "Standard Build"
  ) {
    // 1. Fetch full competition data
    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
      include: {
        sections: true,
        questions: { include: { question: true } },
        config: true,
        economics: true,
        eligibility: true,
      },
    });

    if (!competition) {
      throw new Error(`Competition ${competitionId} not found`);
    }

    const buildContext: BuildContext = {
      competition,
      sections: competition.sections,
      questions: competition.questions,
      config: competition.config,
      economics: competition.economics,
      eligibility: competition.eligibility,
      builderId: userId,
      version: competition.version,
      semanticVersion,
    };

    // 2. Execute Build Pipeline to create Snapshots and Hashes
    const artifact = await VersionBuildPipeline.execute(buildContext);

    // 3. Atomic Persistence
    const result = await prisma.$transaction(async (tx) => {
      const versionArtifact = await tx.competitionVersion.create({
        data: {
          competitionId,
          version: competition.version,
          semanticVersion: semanticVersion,
          schemaVersion: artifact.schemaVersion,

          competitionSnapshot: artifact.competitionSnapshot as any,
          sectionsSnapshot: artifact.sectionsSnapshot as any,
          questionsSnapshot: artifact.questionsSnapshot as any,
          rulesSnapshot: artifact.rulesSnapshot as any,
          configSnapshot: artifact.configSnapshot as any,

          snapshotHash: artifact.snapshotHash,
          manifestHash: artifact.manifestHash,
          artifactHash: artifact.artifactHash,
          fingerprint: artifact.fingerprint,

          freezeDurationMs: artifact.freezeDurationMs,
          reason,
          artifactStatus: ArtifactStatus.READY,
          isActive: true,
          publishedById: userId,

          compatibilities: {
            create: artifact.compatibilities.map((c) => ({
              system: c.system,
              status: c.status,
              details: c.details || {},
            })),
          },

          manifest: {
            create: {
              artifactId: artifact.id || crypto.randomUUID(),
              schemaVersion: artifact.manifest!.schemaVersion,
              snapshotHash: artifact.manifest!.snapshotHash,
              manifestHash: artifact.manifest!.manifestHash,
              artifactHash: artifact.manifest!.artifactHash || "",
              fingerprint: artifact.manifest!.fingerprint,
              entityCount: artifact.manifest!.entityCount,
              questionCount: artifact.manifest!.questionCount,
              sectionCount: artifact.manifest!.sectionCount,
              rewardCount: artifact.manifest!.rewardCount,
              certificateCount: artifact.manifest!.certificateCount,
              healthScore: artifact.manifest!.healthScore || 100,
            },
          },

          buildAudits: {
            create: artifact.buildAudits.map((a) => ({
              builderId: a.builderId,
              durationMs: a.durationMs || 0,
              serializationDurationMs: a.serializationDurationMs || 0,
              validationDurationMs: a.validationDurationMs || 0,
              hashingDurationMs: a.hashingDurationMs || 0,
              registryDurationMs: a.registryDurationMs || 0,
              buildResult: a.buildResult || "SUCCESS",
              executionLogs: a.executionLogs || [],
            })),
          },
        },
      });

      return versionArtifact;
    });

    return result;
  }
}
