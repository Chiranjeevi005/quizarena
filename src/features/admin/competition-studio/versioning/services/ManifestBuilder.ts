import { VersionManifestDTO } from "../types/artifact.types";
import { HashEngine } from "./HashEngine";

export class ManifestBuilder {
  static build(
    artifactId: string,
    schemaVersion: number,
    snapshotHash: string,
    fingerprint: string,
    entityCount: number,
    questionCount: number,
    sectionCount: number,
    rewardCount: number,
    certificateCount: number,
    runtimeVersion?: string,
    submissionVersion?: string,
    leaderboardVersion?: string,
    analyticsVersion?: string,
    builderVersion?: string,
    studioVersion?: string,
    healthScore?: number
  ): VersionManifestDTO {
    const baseManifest: Partial<VersionManifestDTO> = {
      artifactId,
      schemaVersion,
      snapshotHash,
      fingerprint,
      entityCount,
      questionCount,
      sectionCount,
      rewardCount,
      certificateCount,
      runtimeVersion,
      submissionVersion,
      leaderboardVersion,
      analyticsVersion,
      builderVersion,
      studioVersion,
      healthScore,
    };

    const manifestHash = HashEngine.generateManifestHash(baseManifest);

    return {
      ...baseManifest,
      manifestHash,
      artifactHash: "", // This will be set later by ArtifactBuilder when the artifact hash is finalized
    } as VersionManifestDTO;
  }
}
