/**
 * Build Controller
 * 
 * Exposes the Version Build Pipeline to external API routes or TRPC endpoints.
 */

import { VersionBuildKernel } from '../kernel/VersionBuildKernel';
import { CompetitionVersionArtifact } from '../types/artifact.types';

export class BuildControllerService {
  /**
   * API endpoint handler to trigger a new version build.
   */
  async startBuild(
    competitionId: string, 
    userId: string, 
    semanticVersion: string, 
    reason?: string
  ): Promise<CompetitionVersionArtifact> {
    const artifact = await VersionBuildKernel.executeBuild(competitionId, userId, semanticVersion, reason);
    return artifact as unknown as CompetitionVersionArtifact;
  }
}

export const BuildController = new BuildControllerService();
