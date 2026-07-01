import { prisma } from '@/lib/prisma';
import { CompetitionVersionArtifact } from '../types/artifact.types';

export class VersionResolverEngine {
  /**
   * Resolves the "active" immutable version of a competition for runtime read traffic.
   */
  async resolveActiveVersion(competitionId: string): Promise<CompetitionVersionArtifact | null> {
    const version = await prisma.competitionVersion.findFirst({
      where: { competitionId, isActive: true },
      include: {
        compatibilities: true,
        manifest: true
      }
    });

    if (!version) return null;

    return version as unknown as CompetitionVersionArtifact;
  }

  /**
   * Resolves a specific version by its semantic string.
   */
  async resolveBySemanticVersion(competitionId: string, semanticVersion: string): Promise<CompetitionVersionArtifact | null> {
    const version = await prisma.competitionVersion.findFirst({
      where: { competitionId, semanticVersion },
      include: {
        compatibilities: true,
        manifest: true
      }
    });

    if (!version) return null;

    return version as unknown as CompetitionVersionArtifact;
  }
}

export const VersionResolverService = new VersionResolverEngine();
