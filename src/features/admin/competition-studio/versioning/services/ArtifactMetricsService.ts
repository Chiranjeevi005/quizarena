import { prisma } from "@/lib/prisma";

export class ArtifactMetricsEngine {
  /**
   * Retrieves summary metrics of the build times for competition artifacts.
   */
  async getMetricsForCompetition(competitionId: string) {
    const versions = await prisma.competitionVersion.findMany({
      where: { competitionId },
      select: { version: true, semanticVersion: true, freezeDurationMs: true, createdAt: true },
      orderBy: { version: "desc" },
      take: 10,
    });

    const averageBuildTime =
      versions.reduce((sum, v) => sum + (v.freezeDurationMs || 0), 0) / (versions.length || 1);

    return {
      recentBuilds: versions,
      averageBuildTimeMs: averageBuildTime,
      totalBuilds: versions.length,
    };
  }
}

export const ArtifactMetricsService = new ArtifactMetricsEngine();
