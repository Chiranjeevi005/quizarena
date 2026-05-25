/**
 * QuizArena — Security Operations Center (SOC) Type Definitions
 *
 * Complete type layer for Phase 7.7 SOC infrastructure.
 * Server-computed, hydration-safe — all Date objects are serialized
 * as ISO strings before passing to client components.
 *
 * Phase 7.7: Security Operations Center
 */

// ─── Severity Classification ──────────────────────────────────────────────────

/**
 * Five-tier SOC threat severity classification.
 * Mirrors the compliance severity system for consistency.
 */
export type ThreatSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "SEVERE";

// ─── Security Event Classification ───────────────────────────────────────────

export type SecurityEventType =
  | "AUTH_FAILURE"
  | "BRUTE_FORCE"
  | "PRIVILEGE_ESCALATION"
  | "RBAC_BYPASS"
  | "SESSION_ANOMALY"
  | "SUSPICIOUS_PATTERN"
  | "GOVERNANCE_BREACH"
  | "INFRASTRUCTURE_OVERRIDE"
  | "PERMISSION_FAILURE"
  | "HIGH_RISK_BLOCKED"
  | "CRITICAL_OPERATION"
  | "UNAUTHORIZED_ACCESS";

export type AuthEventType =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "LOGOUT"
  | "SESSION_ESTABLISHED"
  | "SESSION_INVALIDATED"
  | "OAUTH_FAILURE"
  | "CREDENTIAL_FAILURE"
  | "STALE_SESSION_DETECTED"
  | "EMAIL_MISMATCH"
  | "ROLE_REVOKED";

export type AlertType =
  | "BRUTE_FORCE_DETECTED"
  | "PRIVILEGE_ESCALATION_ATTEMPT"
  | "SUSPICIOUS_ADMIN_ACTIVITY"
  | "GOVERNANCE_ABUSE_DETECTED"
  | "SESSION_ANOMALY_DETECTED"
  | "REPEATED_AUTH_FAILURE"
  | "INFRASTRUCTURE_THREAT"
  | "SUPER_ADMIN_ATTACK_ATTEMPT"
  | "RBAC_VIOLATION_CLUSTER"
  | "OPERATIONAL_SPIKE";

export type SessionRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// ─── Actor / Identity Types ───────────────────────────────────────────────────

export interface SecurityActorIdentity {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

// ─── Core Security Event ──────────────────────────────────────────────────────

export interface SecurityEvent {
  id: string;
  action: string;
  entityType: string;
  actor: SecurityActorIdentity | null;
  severity: ThreatSeverity;
  eventType: SecurityEventType;
  /** UTC timestamp — never pass raw Date to client */
  timestampISO: string;
  /** Server-computed to avoid hydration mismatch */
  timeAgo: string;
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  /** Suggested investigation workflow */
  investigationWorkflow: string;
  isSovereignThreat: boolean;
}

// ─── Authentication Forensics ─────────────────────────────────────────────────

export interface AuthForensicEvent {
  id: string;
  action: string;
  authEventType: AuthEventType;
  actor: SecurityActorIdentity | null;
  severity: ThreatSeverity;
  timestampISO: string;
  timeAgo: string;
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  isBruteForce: boolean;
  isOAuthFailure: boolean;
  failureReason: string | null;
}

export interface BruteForceProfile {
  actorId: string | null;
  ipAddress: string | null;
  failureCount: number;
  windowHours: number;
  firstAttemptISO: string;
  lastAttemptISO: string;
}

export interface AuthForensicsData {
  recentAuthEvents: AuthForensicEvent[];
  bruteForceProfiles: BruteForceProfile[];
  totalAuthFailures24h: number;
  totalAuthFailures7d: number;
  oauthFailures24h: number;
  suspiciousSessionEvents24h: number;
  /** THREAT | ELEVATED | NORMAL */
  authThreatLevel: "THREAT" | "ELEVATED" | "NORMAL";
}

// ─── Privilege Escalation ─────────────────────────────────────────────────────

export interface EscalationEvent {
  id: string;
  action: string;
  targetActor: SecurityActorIdentity | null;
  initiatedBy: SecurityActorIdentity | null;
  previousRole: string | null;
  newRole: string | null;
  severity: ThreatSeverity;
  timestampISO: string;
  timeAgo: string;
  isUnauthorized: boolean;
  escalationRisk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface RBACViolationEvent {
  id: string;
  action: string;
  actor: SecurityActorIdentity | null;
  severity: ThreatSeverity;
  eventType: SecurityEventType;
  timestampISO: string;
  timeAgo: string;
  metadata: Record<string, unknown> | null;
}

export interface PrivilegeEscalationData {
  recentEscalations: EscalationEvent[];
  rbacViolations: RBACViolationEvent[];
  totalEscalations7d: number;
  totalRBACViolations7d: number;
  unauthorizedAccessAttempts24h: number;
  highRiskEscalations: number;
  /** CRITICAL | HIGH | ELEVATED | LOW */
  escalationThreatLevel: "CRITICAL" | "HIGH" | "ELEVATED" | "LOW";
}

// ─── Threat Timeline ──────────────────────────────────────────────────────────

export interface ThreatTimelineEntry {
  id: string;
  action: string;
  entityType: string;
  actor: SecurityActorIdentity | null;
  severity: ThreatSeverity;
  eventType: SecurityEventType;
  timestampISO: string;
  timeAgo: string;
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  isSovereignThreat: boolean;
  investigationWorkflow: string;
}

export interface ThreatTimeline {
  entries: ThreatTimelineEntry[];
  totalCount: number;
  filteredCount: number;
  hasMore: boolean;
  oldestTimestampISO: string | null;
  newestTimestampISO: string | null;
}

// ─── Suspicious Activity ──────────────────────────────────────────────────────

export type SuspiciousPattern =
  | "REPEATED_AUTH_FAILURE"
  | "REPEATED_PERMISSION_DENIED"
  | "OPERATIONAL_SPIKE"
  | "ABNORMAL_ADMIN_HOURS"
  | "ABNORMAL_MODERATION_VOLUME"
  | "HIGH_RISK_SEQUENCE"
  | "GOVERNANCE_FREQUENCY_ANOMALY";

export interface SuspiciousActorProfile {
  id: string;
  actor: SecurityActorIdentity;
  patterns: SuspiciousPattern[];
  anomalyCount: number;
  riskScore: number; // 0–100
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  firstAnomalyISO: string;
  lastAnomalyISO: string;
  description: string;
  investigationWorkflow: string;
}

export interface SuspiciousActivityData {
  suspiciousActors: SuspiciousActorProfile[];
  totalAnomaliesDetected: number;
  highRiskActorCount: number;
  operationalSpikesDetected: number;
  lastAnalysisISO: string;
}

// ─── Session Governance ───────────────────────────────────────────────────────

export interface PrivilegedSession {
  id: string;
  actor: SecurityActorIdentity;
  /** ISO string of session expiry */
  expiresAtISO: string;
  /** ISO string of session creation (if available) */
  createdAtISO: string | null;
  isStale: boolean;
  ageMinutes: number;
  expiresInMinutes: number;
  riskLevel: SessionRiskLevel;
  riskScore: number; // 0–100
  riskFactors: string[];
}

export interface SessionGovernanceData {
  activeSessions: PrivilegedSession[];
  totalActiveSessions: number;
  staleSessions: number;
  highRiskSessions: number;
  averageSessionAgeMinutes: number;
  sessionHealthStatus: "HEALTHY" | "ELEVATED" | "CRITICAL";
}

// ─── Security Alerts ──────────────────────────────────────────────────────────

export interface SecurityAlert {
  id: string;
  alertType: AlertType;
  title: string;
  description: string;
  severity: ThreatSeverity;
  timestampISO: string;
  timeAgo: string;
  eventCount: number;
  isActive: boolean;
  investigationWorkflow: string;
  requiresImmediateAction: boolean;
}

// ─── Security Overview (KPIs) ─────────────────────────────────────────────────

export interface SecurityOverview {
  /** Counts by time window */
  totalEvents24h: number;
  totalEvents7d: number;
  totalEvents30d: number;
  /** Severity distribution */
  bySeverity: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    CRITICAL: number;
    SEVERE: number;
  };
  /** Active threat counts */
  activeAlerts: number;
  criticalThreats: number;
  authFailures24h: number;
  privilegeEscalations24h: number;
  rbacViolations24h: number;
  /** Session stats */
  activePrivilegedSessions: number;
  /** Platform security posture: 0–100 (higher = safer) */
  securityPostureScore: number;
  /** SECURE | ELEVATED | THREATENED | CRITICAL */
  platformThreatStatus: "SECURE" | "ELEVATED" | "THREATENED" | "CRITICAL";
  lastEventAtISO: string | null;
  lastAggregatedISO: string;
}

// ─── Master SOC Page Data ─────────────────────────────────────────────────────

export interface SOCPageData {
  overview: SecurityOverview;
  alerts: SecurityAlert[];
  authForensics: AuthForensicsData;
  privilegeEscalation: PrivilegeEscalationData;
  threatTimeline: ThreatTimeline;
  suspiciousActivity: SuspiciousActivityData;
  sessionGovernance: SessionGovernanceData;
  lastAggregatedISO: string;
}

// ─── SOC Filter ───────────────────────────────────────────────────────────────

export interface SOCFilter {
  severity?: ThreatSeverity[];
  eventType?: SecurityEventType;
  limit?: number;
  page?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

// ─── Severity Display Config ──────────────────────────────────────────────────

export interface ThreatSeverityDisplayConfig {
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  dotClass: string;
  pulse: boolean;
  description: string;
}

export const THREAT_SEVERITY_DISPLAY: Record<ThreatSeverity, ThreatSeverityDisplayConfig> = {
  LOW: {
    label: "LOW",
    colorClass: "text-slate-400",
    bgClass: "bg-slate-800/60",
    borderClass: "border-slate-700/50",
    dotClass: "bg-slate-500",
    pulse: false,
    description: "Routine security event",
  },
  MEDIUM: {
    label: "MEDIUM",
    colorClass: "text-cyan-400",
    bgClass: "bg-cyan-950/40",
    borderClass: "border-cyan-800/40",
    dotClass: "bg-cyan-400",
    pulse: false,
    description: "Repeated authorization failure",
  },
  HIGH: {
    label: "HIGH",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-950/40",
    borderClass: "border-amber-800/40",
    dotClass: "bg-amber-400",
    pulse: false,
    description: "Privilege escalation attempt",
  },
  CRITICAL: {
    label: "CRITICAL",
    colorClass: "text-orange-400",
    bgClass: "bg-orange-950/40",
    borderClass: "border-orange-800/40",
    dotClass: "bg-orange-500",
    pulse: true,
    description: "Infrastructure override abuse",
  },
  SEVERE: {
    label: "SEVERE",
    colorClass: "text-red-400",
    bgClass: "bg-red-950/40",
    borderClass: "border-red-800/40",
    dotClass: "bg-red-500",
    pulse: true,
    description: "Potential platform compromise",
  },
};
