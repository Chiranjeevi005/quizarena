import { CompetitionVersionArtifact } from '../types/artifact.types';
import { HashEngine } from './HashEngine';

export class VersionVerificationService {
  /**
   * Verifies the integrity of a deployed artifact by recomputing its hash
   * and comparing against the stored artifactHash.
   */
  static verify(artifact: CompetitionVersionArtifact): boolean {
    const computedHash = HashEngine.generateArtifactHash(artifact);
    return computedHash === artifact.artifactHash;
  }
}
