/**
 * QuizArena — Sovereign Feature Rollouts Types
 *
 * Types for the release governance and feature management system.
 * Server-authoritative and hydration-safe.
 */

import type { RolloutType } from "@/generated/prisma";
import type { SecurityActorIdentity } from "./super-admin-security";

// Prisma generated enum re-export for client use if needed
export { RolloutType };

export type EnvironmentType = "development" | "staging" | "production";

export interface RolloutEnvironments {
  development: boolean;
  staging: boolean;
  production: boolean;
}

export interface FeatureFlagPayload {
  id: string;
  key: string;
  name: string;
  description: string | null;
  enabled: boolean;
  rolloutType: RolloutType;
  rolloutValue: number | null;
  environments: RolloutEnvironments;
  createdAtISO: string;
  updatedAtISO: string;
  creator: SecurityActorIdentity | null;
  updater: SecurityActorIdentity | null;
}

export interface RolloutStats {
  totalFeatures: number;
  activeFeatures: number;
  percentageRollouts: number;
  experimentalFeatures: number;
  disabledFeatures: number;
  highRiskFeatures: number; // e.g. features targeting infrastructure/security
}

export interface RolloutAnalytics {
  globalAdoptionCount: number;
  percentageDistribution: {
    enabled: number;
    disabled: number;
  };
  roleDistribution: Record<string, number>;
}

export interface FeatureGovernanceData {
  stats: RolloutStats;
  flags: FeatureFlagPayload[];
  lastAggregatedISO: string;
}

export interface RolloutEvaluationContext {
  userId?: string;
  role?: string;
  environment?: EnvironmentType;
}

export interface RolloutEvaluationResult {
  enabled: boolean;
  reason:
    | "GLOBAL"
    | "PERCENTAGE_HIT"
    | "PERCENTAGE_MISS"
    | "ROLE_MATCH"
    | "ROLE_MISMATCH"
    | "USER_MATCH"
    | "USER_MISMATCH"
    | "ENV_DISABLED"
    | "GLOBALLY_DISABLED";
}
