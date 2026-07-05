export enum ArtifactStatus {
  BUILDING = "BUILDING",
  VERIFIED = "VERIFIED",
  READY = "READY",
  FAILED = "FAILED",
  SUPERSEDED = "SUPERSEDED",
}

export type SubsystemType =
  | "RUNTIME"
  | "SUBMISSION"
  | "RESULTS"
  | "LEADERBOARD"
  | "REWARDS"
  | "CERTIFICATES"
  | "ANALYTICS"
  | "LIFECYCLE";

export type CompatibilityStatus = "COMPATIBLE" | "PARTIALLY_COMPATIBLE" | "BLOCKED";

export interface VersionCompatibilityDTO {
  system: SubsystemType;
  status: CompatibilityStatus;
  details?: any;
}

export interface VersionManifestDTO {
  artifactId: string;
  schemaVersion: number;
  manifestHash: string;
  snapshotHash: string;
  artifactHash: string;
  fingerprint: string;
  builderVersion?: string;
  studioVersion?: string;
  healthScore?: number;

  entityCount: number;
  questionCount: number;
  sectionCount: number;
  rewardCount: number;
  certificateCount: number;

  runtimeVersion?: string;
  submissionVersion?: string;
  leaderboardVersion?: string;
  analyticsVersion?: string;
}

export interface VersionBuildAuditDTO {
  durationMs: number;
  serializationDurationMs?: number;
  validationDurationMs?: number;
  hashingDurationMs?: number;
  registryDurationMs?: number;

  builderId?: string;
  executionLogs?: string[];
  buildResult: "SUCCESS" | "FAILURE";
  warnings?: string[];
  reason?: string;
}

export interface CompetitionVersionArtifact {
  id: string;
  competitionId: string;

  version: number;
  semanticVersion: string;
  schemaVersion: number;

  // Hashes
  snapshotHash: string;
  manifestHash: string;
  artifactHash: string;
  fingerprint: string;

  // Build Metrics
  freezeDurationMs?: number;
  buildStartedAt?: string;
  buildCompletedAt?: string;
  buildNumber?: number;
  artifactSizeBytes?: number;
  manifestVersion?: string;
  reason?: string;

  // Snapshots
  competitionSnapshot: any;
  sectionsSnapshot: any;
  questionsSnapshot: any;
  rulesSnapshot: any;
  configSnapshot: any;

  artifactStatus: ArtifactStatus;

  manifest?: VersionManifestDTO;
  compatibilities: VersionCompatibilityDTO[];
  buildAudits: VersionBuildAuditDTO[];
}
