import { createHash } from 'crypto';
import { SnapshotSerializer } from './SnapshotSerializer';
import { VersionManifestDTO, CompetitionVersionArtifact } from '../types/artifact.types';
import { CompetitionSnapshotDTO } from '../types/version.types';

export class HashEngine {
  /**
   * Generates SHA-256 hash for the competition snapshot.
   */
  static generateSnapshotHash(snapshot: CompetitionSnapshotDTO): string {
    const serialized = SnapshotSerializer.serialize(snapshot);
    return createHash('sha256').update(serialized).digest('hex');
  }

  /**
   * Generates SHA-256 hash for the deployment manifest.
   */
  static generateManifestHash(manifest: Partial<VersionManifestDTO>): string {
    const serialized = SnapshotSerializer.stableStringify(manifest);
    return createHash('sha256').update(serialized).digest('hex');
  }

  /**
   * Generates SHA-256 hash for the final artifact, excluding transient metadata.
   */
  static generateArtifactHash(artifact: Partial<CompetitionVersionArtifact>): string {
    const { 
      id, 
      competitionId, 
      buildStartedAt, 
      buildCompletedAt, 
      freezeDurationMs, 
      artifactStatus, 
      buildAudits,
      ...hashableFields 
    } = artifact as any;
    
    const serialized = SnapshotSerializer.stableStringify(hashableFields);
    return createHash('sha256').update(serialized).digest('hex');
  }
}
