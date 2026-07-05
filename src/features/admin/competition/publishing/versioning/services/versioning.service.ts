import { prisma } from "@/lib/prisma";
import { CompetitionWithRelations } from "../../../types";
import { CompetitionVersionInfo } from "../types/versioning.types";
import { VersionBuildKernel } from "../../../../competition-studio/versioning/kernel/VersionBuildKernel";

export async function getVersionHistory(competitionId: string): Promise<CompetitionVersionInfo[]> {
  const versions = await prisma.competitionVersion.findMany({
    where: { competitionId },
    orderBy: { version: "desc" },
    include: { publishedBy: { select: { id: true, name: true, email: true } } },
  });

  return versions.map((v) => ({
    id: v.id,
    versionNumber: v.version,
    publishedAt: v.createdAt.toISOString(),
    publishedBy: v.publishedBy
      ? {
          id: v.publishedBy.id,
          name: v.publishedBy.name || v.publishedBy.email || "Unknown",
        }
      : null,
    changelog: v.reason || "",
    isActive: v.isActive,
    createdAt: v.createdAt.toISOString(),
  }));
}

export async function createVersionSnapshot(
  competition: CompetitionWithRelations,
  userId: string,
  changelog: string,
  tx?: any // Optional Prisma transaction client
) {
  const db = tx || prisma;

  // Actually we should just call VersionBuildKernel.executeBuild since Phase 06 handles snapshots deterministically.
  // We'll pass the reason as changelog and calculate semanticVersion
  const lastVersion = await db.competitionVersion.findFirst({
    where: { competitionId: competition.id },
    orderBy: { version: "desc" },
  });

  const nextVersionNumber = lastVersion ? lastVersion.version + 1 : 1;
  const semanticVersion = `1.${nextVersionNumber}.0`;

  // Deactivate existing versions
  await db.competitionVersion.updateMany({
    where: { competitionId: competition.id },
    data: { isActive: false },
  });

  // Use the Phase 06 builder
  const newVersion = await VersionBuildKernel.executeBuild(
    competition.id,
    userId,
    semanticVersion,
    changelog
  );

  return newVersion as any;
}
