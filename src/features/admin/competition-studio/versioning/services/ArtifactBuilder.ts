import { 
  CompetitionVersionArtifact, 
  VersionManifestDTO, 
  VersionCompatibilityDTO,
  ArtifactStatus
} from '../types/artifact.types';
import { CompetitionSnapshotDTO } from '../types/version.types';

export class ArtifactBuilder {
  /**
   * Assembles the partial CompetitionVersion artifact wrapper before final hashing.
   */
  static buildPartial(
    competitionId: string,
    version: number,
    semanticVersion: string,
    snapshot: CompetitionSnapshotDTO,
    manifest: VersionManifestDTO,
    compatibilities: VersionCompatibilityDTO[]
  ): Partial<CompetitionVersionArtifact> {
    return {
      competitionId,
      version,
      semanticVersion,
      schemaVersion: manifest.schemaVersion,
      snapshotHash: manifest.snapshotHash,
      manifestHash: manifest.manifestHash,
      fingerprint: manifest.fingerprint,
      
      competitionSnapshot: snapshot.metadata,
      sectionsSnapshot: snapshot.sections,
      questionsSnapshot: snapshot.questions,
      rulesSnapshot: snapshot.rules,
      configSnapshot: snapshot.config,

      manifest,
      compatibilities,
      buildAudits: [],
      artifactStatus: ArtifactStatus.BUILDING
    };
  }
}
