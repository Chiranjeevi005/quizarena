import { CompetitionVersionArtifact } from '../types/artifact.types';
import { EventBus } from '../../studio/bus/EventBus';

export class ArtifactRecoveryService {
  /**
   * Recovers from a failed build transaction, cleaning up any temporary objects.
   */
  static async rollbackTransaction(competitionId: string, error: Error) {
    console.error(`Rolling back build transaction for competition ${competitionId}`, error);
    // Prisma transaction is rolled back automatically if an error is thrown,
    // but any external artifacts (e.g. S3 objects, cache) need manual cleanup here.
    
    await EventBus.publish('VersionBuildFailed', {
      competitionId,
      error: error.message
    });
  }
}
