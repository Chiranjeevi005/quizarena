/**
 * QuizArena — Enterprise Compliance & Forensic Audit Typings
 *
 * Strict TypeScript definitions for the sovereign compliance center.
 * Used exclusively by SUPER_ADMIN compliance infrastructure.
 *
 * Phase 7.6: Enterprise Audit & Compliance Center
 */

// ─── Severity Classification ────────────────────────────────────────────────

/**
 * Five-tier compliance severity classification.
 * Maps DB AuditSeverity → institutional severity layer.
 */
export type ComplianceSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "SEVERE";

/** DB-level audit severity from Prisma schema */
export type DbAuditSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

/** Maps DB severity + context → compliance severity */
export interface SeverityContext {
  dbSeverity: DbAuditSeverity;
  /** If true, applies SEVERE override for SUPER_ADMIN governance actions */
  isSovereignAction: boolean;
}

// ─── Governance Audit Entry ─────────────────────────────────────────────────

export interface GovernanceActorIdentity {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

export interface GovernanceTargetIdentity {
  id: string;
  name: string | null;
  email: string | null;
}

/**
 * Enriched audit log entry with full governance context.
 * Aggregated server-side — never computed client-side.
 */
export interface GovernanceAuditEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  actor: GovernanceActorIdentity | null;
  target: GovernanceTargetIdentity | null;
  severity: ComplianceSeverity;
  dbSeverity: DbAuditSeverity;
  category: string;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown> | null;
  timestamp: Date;
  /** Formatted ISO string for client hydration safety */
  timestampISO: string;
  /** Human-readable relative time label (server-computed) */
  timeAgo: string;
  /** Indicates this is a sovereign SUPER_ADMIN action */
  isSovereignAction: boolean;
  /** Governance category derived from metadata */
  governanceCategory: GovernanceCategory;
}

// ─── Governance Categories ──────────────────────────────────────────────────

export type GovernanceCategory =
  | "AUTHENTICATION"
  | "ROLE_GOVERNANCE"
  | "FINANCIAL_CONTROL"
  | "INFRASTRUCTURE"
  | "SECURITY"
  | "COMPLIANCE"
  | "PLATFORM_CONTROLS"
  | "SESSION_MANAGEMENT"
  | "HIGH_RISK_ACTION"
  | "DATA_ACCESS"
  | "MODERATION"
  | "SETTINGS"
  | "SYSTEM"
  | "UNKNOWN";

// ─── Governance Timeline ────────────────────────────────────────────────────

export interface GovernanceTimeline {
  entries: GovernanceAuditEntry[];
  totalCount: number;
  filteredCount: number;
  hasMore: boolean;
  oldestTimestamp: Date | null;
  newestTimestamp: Date | null;
}

// ─── Compliance Overview ────────────────────────────────────────────────────

export interface SeverityBreakdown {
  LOW: number;
  MEDIUM: number;
  HIGH: number;
  CRITICAL: number;
  SEVERE: number;
}

export interface CategoryBreakdown {
  category: GovernanceCategory;
  count: number;
  lastEventAt: Date | null;
}

/**
 * Aggregate compliance statistics for overview cards.
 */
export interface ComplianceOverview {
  /** Total audit events stored (all time) */
  totalEvents: number;
  /** Audit events in last 24 hours */
  events24h: number;
  /** Audit events in last 7 days */
  events7d: number;
  /** Audit events in last 30 days */
  events30d: number;
  /** Breakdown by severity tier */
  bySeverity: SeverityBreakdown;
  /** Breakdown by governance category */
  byCategory: CategoryBreakdown[];
  /** Count of CRITICAL+SEVERE events in last 24h */
  criticalEvents24h: number;
  /** Count of HIGH+CRITICAL+SEVERE events in last 7d */
  highRiskEvents7d: number;
  /** Whether immutable audit storage is operational */
  immutabilityEnforced: boolean;
  /** Last audit event timestamp */
  lastEventAt: Date | null;
  lastEventAtISO: string | null;
  /** Total unique actors in audit trail */
  uniqueActors: number;
}

// ─── Security Forensics ──────────────────────────────────────────────────────

export interface SecurityForensicEvent {
  id: string;
  action: string;
  entityType: string;
  actor: GovernanceActorIdentity | null;
  severity: ComplianceSeverity;
  timestamp: Date;
  timestampISO: string;
  timeAgo: string;
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  /** Classification of security event type */
  securityEventType: SecurityEventType;
}

export type SecurityEventType =
  | "AUTH_FAILURE"
  | "ROLE_ESCALATION"
  | "UNAUTHORIZED_ACCESS"
  | "INFRASTRUCTURE_OVERRIDE"
  | "SESSION_ANOMALY"
  | "PERMISSION_FAILURE"
  | "GOVERNANCE_BREACH"
  | "SUSPICIOUS_PATTERN"
  | "HIGH_RISK_BLOCKED"
  | "CRITICAL_OPERATION";

export interface SecurityForensicsData {
  /** Recent CRITICAL + HIGH security audit events */
  recentCriticalEvents: SecurityForensicEvent[];
  /** Auth-related failures and anomalies */
  authEvents: SecurityForensicEvent[];
  /** Role escalation / RBAC violation events */
  rbacEvents: SecurityForensicEvent[];
  /** Infrastructure override attempts */
  infrastructureEvents: SecurityForensicEvent[];
  /** Summary counts */
  totalCritical7d: number;
  totalHigh7d: number;
  authFailures24h: number;
  rbacViolations7d: number;
  /** Threat level assessment */
  threatLevel: "LOW" | "ELEVATED" | "HIGH" | "CRITICAL";
}

// ─── Governance Anomalies ────────────────────────────────────────────────────

export type AnomalyType =
  | "REPEATED_CRITICAL_ACTOR"
  | "ROLE_ESCALATION_SPIKE"
  | "INFRASTRUCTURE_OVERRIDE_SPIKE"
  | "UNUSUAL_GOVERNANCE_VOLUME"
  | "SUSPICIOUS_AUTH_PATTERN"
  | "PERMISSION_FAILURE_CLUSTER"
  | "RAPID_SETTING_CHANGES"
  | "OFF_HOURS_GOVERNANCE_ACTIVITY";

export interface GovernanceAnomaly {
  id: string;
  type: AnomalyType;
  title: string;
  description: string;
  severity: ComplianceSeverity;
  /** Actor involved (if applicable) */
  actor: GovernanceActorIdentity | null;
  /** Number of events forming this anomaly */
  eventCount: number;
  /** Time window in which anomaly was detected */
  detectionWindow: string;
  /** Timestamps of anomalous events */
  firstEventAt: Date | null;
  lastEventAt: Date | null;
  firstEventAtISO: string | null;
  lastEventAtISO: string | null;
  /** Recommended investigation action */
  investigationAction: string;
}

// ─── Audit Chain Reconstruction ──────────────────────────────────────────────

export interface AuditChainEntry {
  id: string;
  sequence: number;
  action: string;
  entityType: string;
  actor: GovernanceActorIdentity | null;
  severity: ComplianceSeverity;
  timestamp: Date;
  timestampISO: string;
  timeAgo: string;
  metadata: Record<string, unknown> | null;
  /** Relationship to the anchor event */
  chainRelationship: "ANCHOR" | "PRECURSOR" | "CONSEQUENCE" | "CONCURRENT";
}

export interface GovernanceChain {
  anchorEventId: string;
  entries: AuditChainEntry[];
  primaryActor: GovernanceActorIdentity | null;
  affectedEntities: string[];
  chainDuration: string;
  governanceSummary: string;
}

// ─── Compliance Filter ───────────────────────────────────────────────────────

export interface ComplianceFilter {
  severity?: ComplianceSeverity[];
  category?: GovernanceCategory[];
  actorId?: string;
  entityType?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
  /** Pagination */
  page?: number;
  limit?: number;
}

// ─── Role Change Forensics ───────────────────────────────────────────────────

export interface RoleChangeForensicEntry {
  id: string;
  actor: GovernanceActorIdentity;
  target: GovernanceTargetIdentity;
  previousRole: string;
  newRole: string;
  reason: string | null;
  severity: ComplianceSeverity;
  timestamp: Date;
  timestampISO: string;
  timeAgo: string;
}

// ─── Setting Audit Forensics ─────────────────────────────────────────────────

export interface SettingAuditForensicEntry {
  id: string;
  settingKey: string;
  actor: GovernanceActorIdentity;
  reason: string | null;
  severity: ComplianceSeverity;
  timestamp: Date;
  timestampISO: string;
  timeAgo: string;
}

// ─── Full Compliance Page Data ───────────────────────────────────────────────

/**
 * Aggregated compliance page data — fully server-computed.
 * Passed to page components as props.
 */
export interface CompliancePageData {
  overview: ComplianceOverview;
  timeline: GovernanceTimeline;
  securityForensics: SecurityForensicsData;
  anomalies: GovernanceAnomaly[];
  recentRoleChanges: RoleChangeForensicEntry[];
  recentSettingAudits: SettingAuditForensicEntry[];
  lastAggregated: Date;
  lastAggregatedISO: string;
}
