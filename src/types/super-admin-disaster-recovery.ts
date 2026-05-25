/**
 * QuizArena — Sovereign Disaster Recovery & Fail-Safe Control Types
 *
 * This file defines the core types for operational survivability,
 * fail-safe states, and emergency lockdown controls.
 *
 * ALL types here are for SUPER_ADMIN governance systems ONLY.
 */

/**
 * Operational Emergency Severity Levels
 * These dictate the urgency and scale of a disaster recovery scenario.
 */
export type EmergencySeverity = "WARNING" | "CRITICAL" | "SEVERE" | "CATASTROPHIC";

/**
 * Fail-Safe Operational States
 * The global platform state at any given time.
 */
export type FailSafeState =
  | "OPERATIONAL" // Normal platform operation
  | "DEGRADED" // Minor feature loss, core systems operational
  | "MAINTENANCE" // Scheduled or unscheduled safe downtime
  | "RECOVERY" // Active recovery operations in progress
  | "EMERGENCY_LOCKDOWN"; // Complete platform freeze

/**
 * Audit Event for Recovery/Emergency Actions
 * Governance requirement for all fail-safe changes.
 */
export interface RecoveryAuditEvent {
  id: string;
  action:
    | "ACTIVATE_LOCKDOWN"
    | "DEACTIVATE_LOCKDOWN"
    | "ACTIVATE_RECOVERY_MODE"
    | "DISABLE_REGISTRATIONS"
    | "FREEZE_CHALLENGES"
    | "MAINTENANCE_MODE_TOGGLE";
  actorId: string;
  actorEmail: string;
  timestamp: string;
  severity: EmergencySeverity;
  reason: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Infrastructure Service Health
 * Tracks the availability of core dependencies.
 */
export interface ServiceHealth {
  serviceId: string;
  name: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  uptime: number; // percentage (e.g., 99.9)
  lastFailureAt?: string;
  responseTimeMs: number;
}

/**
 * Platform Resilience Overview
 * A high-level aggregate of the platform's survivability status.
 */
export interface ResilienceOverview {
  currentState: FailSafeState;
  activeIncidents: number;
  criticalServicesOnline: boolean;
  databaseConnectivity: "STABLE" | "UNSTABLE" | "DISCONNECTED";
  authSystemHealth: "HEALTHY" | "FAILING";
  lastSnapshotTimestamp: string;
  services: ServiceHealth[];
}

/**
 * Recovery Workflow definition
 * Pre-defined runbooks for operational failures.
 */
export interface RecoveryWorkflow {
  id: string;
  name: string;
  description: string;
  triggerEvent: string;
  recommendedAction: string;
  isActive: boolean;
  estimatedRecoveryTime: string; // e.g. '5m', '1h'
}

/**
 * Backup Governance Foundation
 * Tracks the status of database snapshots and operational checkpoints.
 */
export interface BackupSnapshot {
  id: string;
  type: "DATABASE" | "INFRASTRUCTURE" | "CHECKPOINT";
  status: "COMPLETED" | "IN_PROGRESS" | "FAILED";
  sizeBytes: number;
  createdAt: string;
  expiresAt: string;
  isEncrypted: boolean;
  storageRegion: string;
}

/**
 * Lockdown Event definition
 * State of a specific feature or subsystem during emergencies.
 */
export interface LockdownStatus {
  registrationsEnabled: boolean;
  challengesPublishable: boolean;
  moderationActive: boolean;
  financialTransactionsEnabled: boolean;
  activeLockdowns: number;
}
