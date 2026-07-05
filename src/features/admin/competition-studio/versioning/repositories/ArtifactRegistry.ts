import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export class ArtifactRegistry {
  /**
   * Retrieves a specific version artifact by competition and semantic version string.
   */
  static async getArtifact(competitionId: string, semanticVersion: string) {
    const artifact = await prisma.competitionVersion.findFirst({
      where: {
        competitionId,
        semanticVersion,
      },
      include: {
        manifest: true,
        compatibilities: true,
        buildAudits: true,
      },
    });

    if (!artifact) {
      throw new Error(`Artifact ${semanticVersion} for competition ${competitionId} not found.`);
    }

    return artifact;
  }

  /**
   * Retrieves the latest fully compatible and active Version Artifact for Runtime use.
   * Runtime MUST use this method to access competitions.
   */
  static async getLatestCompatibleArtifact(competitionId: string) {
    const artifact = await prisma.competitionVersion.findFirst({
      where: {
        competitionId,
        isActive: true,
        artifactStatus: "READY",
        compatibilities: {
          every: {
            status: { not: "BLOCKED" },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        manifest: true,
        compatibilities: true,
      },
    });

    if (!artifact) {
      throw new Error(`No compatible ready artifact found for competition ${competitionId}`);
    }

    return artifact;
  }

  /**
   * Returns the entire version DAG (history) for a competition.
   */
  static async getVersionHistory(competitionId: string) {
    return await prisma.competitionVersion.findMany({
      where: { competitionId },
      orderBy: { version: "desc" },
      select: {
        id: true,
        version: true,
        semanticVersion: true,
        schemaVersion: true,
        artifactStatus: true,
        createdAt: true,
        snapshotHash: true,
        manifestHash: true,
        artifactHash: true,
        parentVersionId: true,
        freezeDurationMs: true,
        manifest: {
          select: { healthScore: true, entityCount: true },
        },
        publishedBy: {
          select: { name: true, email: true },
        },
      },
    });
  }

  /**
   * Fetches the build audit records for an artifact.
   */
  static async getBuildAudits(artifactId: string) {
    return await prisma.versionBuildAudit.findMany({
      where: { competitionVersionId: artifactId },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Fetches the manifest for an artifact.
   */
  static async getManifest(artifactId: string) {
    return await prisma.versionManifest.findUnique({
      where: { competitionVersionId: artifactId },
    });
  }
}
