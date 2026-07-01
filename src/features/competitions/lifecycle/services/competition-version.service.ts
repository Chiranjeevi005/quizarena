import { prisma } from '@/lib/prisma';
import { VersionBuildKernel } from '../../../admin/competition-studio/versioning/kernel/VersionBuildKernel';

export class CompetitionVersionService {
  /**
   * Creates an immutable version snapshot of the competition.
   * Runtime, leaderboard, and certificates should ONLY read from this version.
   */
  async createSnapshot(competitionId: string, actorId?: string): Promise<void> {
    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
    });

    if (!competition) throw new Error('Competition not found');

    const nextVersionNumber = competition.lifecycleVersion + 1;
    const semanticVersion = `1.${nextVersionNumber}.0`;

    // Use the new Phase 06 versioning pipeline
    await VersionBuildKernel.executeBuild(
      competition.id,
      actorId || 'system',
      semanticVersion,
      'Lifecycle state transition generated version'
    );

    // Update the competition's current lifecycle version and deactivate old versions
    await prisma.$transaction([
      prisma.competitionVersion.updateMany({
        where: { competitionId: competition.id, version: { lt: nextVersionNumber } },
        data: { isActive: false }
      }),
      prisma.competition.update({
        where: { id: competition.id },
        data: { lifecycleVersion: nextVersionNumber }
      })
    ]);
  }
}

export const competitionVersion = new CompetitionVersionService();
