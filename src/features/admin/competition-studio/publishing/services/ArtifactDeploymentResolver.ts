import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export class ArtifactDeploymentResolver {
  /**
   * Resolves a verified Competition Version Artifact.
   * Throws an error if the artifact is not found, not verified, or not active.
   * NEVER loads the mutable Competition entity.
   */
  public async resolveArtifact(versionId: string) {
    const version = await prisma.competitionVersion.findUnique({
      where: { id: versionId },
      include: {
        manifest: true,
      },
    });

    if (!version) {
      throw new Error(`CompetitionVersion ${versionId} not found.`);
    }

    if (version.artifactStatus !== "VERIFIED" && version.artifactStatus !== "READY") {
      throw new Error(
        `CompetitionVersion ${versionId} is not a verified artifact. Current status: ${version.artifactStatus}`
      );
    }

    if (!version.manifest) {
      throw new Error(`CompetitionVersion ${versionId} is missing a deployment manifest.`);
    }

    return {
      versionId: version.id,
      competitionId: version.competitionId,
      versionNumber: version.version,
      semanticVersion: version.semanticVersion,
      manifest: version.manifest,
      snapshots: {
        competition: version.competitionSnapshot,
        sections: version.sectionsSnapshot,
        questions: version.questionsSnapshot,
        rules: version.rulesSnapshot,
        config: version.configSnapshot,
      },
    };
  }
}
