import { 
  Competition, 
  CompetitionSection, 
  CompetitionQuestion, 
  CompetitionConfig, 
  CompetitionEconomics, 
  CompetitionEligibility, 
  Question 
} from '@/generated/prisma';
import { SnapshotBuilder } from './SnapshotBuilder';
import { ManifestBuilder } from './ManifestBuilder';
import { HashEngine } from './HashEngine';
import { IntegrityEngine } from './IntegrityEngine';
import { CompatibilityEngine } from './CompatibilityEngine';
import { ArtifactBuilder } from './ArtifactBuilder';
import { CompetitionVersionArtifact, VersionBuildAuditDTO, ArtifactStatus } from '../types/artifact.types';
import { EventBus } from '../../studio/bus/EventBus';

export interface BuildContext {
  competition: Competition;
  sections: CompetitionSection[];
  questions: (CompetitionQuestion & { question: Question })[];
  config: CompetitionConfig | null;
  economics: CompetitionEconomics | null;
  eligibility: CompetitionEligibility | null;
  builderId: string;
  version: number;
  semanticVersion: string;
}

export class VersionBuildPipeline {
  /**
   * Executes the version build pipeline.
   * In a real implementation, this would be wrapped in a Prisma transaction.
   */
  static async execute(context: BuildContext): Promise<CompetitionVersionArtifact> {
    const buildStartTime = Date.now();
    const audits: Partial<VersionBuildAuditDTO> = {
      builderId: context.builderId,
    };
    
    // 1. Build Started
    await EventBus.publish('VersionBuildStarted', { competitionId: context.competition.id });

    try {
      // 2. Snapshot (Immutable DTOs, no Prisma models)
      const tSnapshot = Date.now();
      const snapshot = SnapshotBuilder.buildCompleteSnapshot(
        context.competition,
        context.sections,
        context.questions,
        context.config,
        context.economics,
        context.eligibility
      );
      audits.serializationDurationMs = Date.now() - tSnapshot;
      await EventBus.publish('SnapshotBuilt', { competitionId: context.competition.id });

      // 3. Snapshot Validation (Integrity)
      const tValidation = Date.now();
      const integrityResult = IntegrityEngine.validate(snapshot);
      if (!integrityResult.valid) {
        throw new Error(`Integrity Validation Failed: ${integrityResult.errors.join(', ')}`);
      }
      audits.validationDurationMs = Date.now() - tValidation;
      await EventBus.publish('IntegrityVerified', { competitionId: context.competition.id });

      // 4. Hashing
      const tHashing = Date.now();
      const snapshotHash = HashEngine.generateSnapshotHash(snapshot);

      // 5. Manifest
      const manifest = ManifestBuilder.build(
        'pending-artifact-id', // will be replaced
        1, // schemaVersion
        snapshotHash,
        `fp-${context.competition.id}-${Date.now()}`,
        context.sections.length + context.questions.length + 1, // entityCount
        context.questions.length,
        context.sections.length,
        0, // rewardCount
        0  // certificateCount
      );
      await EventBus.publish('ManifestBuilt', { competitionId: context.competition.id });

      // 6. Compatibility
      const compatibilities = CompatibilityEngine.evaluate(manifest, snapshot);
      await EventBus.publish('CompatibilityVerified', { competitionId: context.competition.id });

      // 7. Artifact Generation
      const partialArtifact = ArtifactBuilder.buildPartial(
        context.competition.id,
        context.version,
        context.semanticVersion,
        snapshot,
        manifest,
        compatibilities
      );

      // 8. Artifact Hash Finalization & Verification
      const artifactHash = HashEngine.generateArtifactHash(partialArtifact);
      partialArtifact.artifactHash = artifactHash;
      partialArtifact.manifest!.artifactHash = artifactHash;
      audits.hashingDurationMs = Date.now() - tHashing;
      await EventBus.publish('ArtifactBuilt', { competitionId: context.competition.id });

      // 9. Registry & Storage (Simulated via return object)
      const tRegistry = Date.now();
      const finalArtifact: CompetitionVersionArtifact = {
        ...partialArtifact,
        id: `art-${artifactHash.substring(0, 8)}`,
        artifactStatus: ArtifactStatus.VERIFIED,
        buildStartedAt: new Date(buildStartTime).toISOString(),
        buildCompletedAt: new Date().toISOString(),
        freezeDurationMs: Date.now() - buildStartTime,
        buildAudits: []
      } as CompetitionVersionArtifact;

      finalArtifact.manifest!.artifactId = finalArtifact.id;
      audits.registryDurationMs = Date.now() - tRegistry;
      await EventBus.publish('ArtifactStored', { competitionId: context.competition.id, artifactId: finalArtifact.id });

      // 10. Audit
      audits.durationMs = Date.now() - buildStartTime;
      audits.buildResult = 'SUCCESS';
      finalArtifact.buildAudits.push(audits as VersionBuildAuditDTO);

      // 11. Completed
      await EventBus.publish('VersionBuildCompleted', { 
        competitionId: context.competition.id, 
        artifactId: finalArtifact.id 
      });

      return finalArtifact;

    } catch (error: any) {
      // Build Failed -> Rollback Transaction -> Audit Failure -> Notify Studio
      audits.durationMs = Date.now() - buildStartTime;
      audits.buildResult = 'FAILURE';
      audits.executionLogs = [error.message];
      
      // In a real application, the Prisma transaction would rollback here.
      // ArtifactRecoveryService.rollbackTransaction(...)
      
      await EventBus.publish('VersionBuildFailed', { 
        competitionId: context.competition.id, 
        error: error.message 
      });
      
      throw error;
    }
  }
}
