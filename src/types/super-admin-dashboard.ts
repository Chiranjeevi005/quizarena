/**
 * QuizArena — Sovereign Dashboard Typings
 *
 * Strict typings for the Super Admin Command Center.
 */

// ─── PLATFORM OVERVIEW ──────────────────────────────────────
export interface PlatformOverviewData {
  totalUsers: number;
  totalModerators: number;
  totalAdmins: number;
  activeChallenges: number;
  moderationThroughput: number;
  operationalHealthScore: number;
  engagementTrend: "UP" | "DOWN" | "STABLE";
  infrastructureState: "HEALTHY" | "WARNING" | "CRITICAL";
  securityAlertCount: number;
}

// ─── INFRASTRUCTURE HEALTH ──────────────────────────────────
export type InfraComponentHealth = "HEALTHY" | "WARNING" | "CRITICAL";

export interface InfraSystemStatus {
  id: string;
  name: string;
  status: InfraComponentHealth;
  message?: string;
  uptime: string;
}

export interface InfrastructureHealthData {
  cronJobs: InfraSystemStatus;
  publishing: InfraSystemStatus;
  moderation: InfraSystemStatus;
  analytics: InfraSystemStatus;
  auth: InfraSystemStatus;
  database: InfraSystemStatus;
  totalOperationalFailures: number;
  lastChecked: Date;
}

// ─── STRATEGIC INTELLIGENCE ─────────────────────────────────
export interface StrategicIntelligenceData {
  engagementVelocity: number;
  moderationBottlenecks: number;
  anomaliesDetected: number;
  growthIndicator: "ACCELERATING" | "STABLE" | "DECLINING";
  contentQualityScore: number; // 0-100
  insights: string[];
}

// ─── SECURITY SNAPSHOT ──────────────────────────────────────
export interface SecuritySnapshotData {
  failedLogins24h: number;
  suspiciousActivityCount: number;
  roleEscalationAttempts: number;
  abnormalModerationEvents: number;
  unresolvedAbuseReports: number;
  threatLevel: "LOW" | "ELEVATED" | "HIGH" | "CRITICAL";
}

// ─── GOVERNANCE STATUS ──────────────────────────────────────
export interface GovernanceStatusData {
  activeAdmins: number;
  activeModerators: number;
  recentRoleChanges: number;
  auditEvents24h: number;
  privilegedOperations: number;
  governanceRiskScore: "LOW" | "MEDIUM" | "HIGH"; // Text-based
}

// ─── OPERATIONAL ALERTS ─────────────────────────────────────
export type AlertSeverity = "INFO" | "WARNING" | "CRITICAL" | "EMERGENCY";

export interface SovereignAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: Date;
  category: "INFRASTRUCTURE" | "SECURITY" | "GOVERNANCE" | "OPERATIONS";
  actionUrl?: string;
}

export interface OperationalAlertData {
  activeAlerts: SovereignAlert[];
  criticalCount: number;
  warningCount: number;
}

// ─── EXECUTIVE TIMELINE ─────────────────────────────────────
export type TimelineEventType = "GOVERNANCE" | "INFRASTRUCTURE" | "SECURITY" | "OPERATIONS";

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  timestamp: Date;
  actor?: string;
}

// ─── COMBINED DASHBOARD DATA ────────────────────────────────
export interface SovereignDashboardData {
  overview: PlatformOverviewData;
  health: InfrastructureHealthData;
  intelligence: StrategicIntelligenceData;
  security: SecuritySnapshotData;
  governance: GovernanceStatusData;
  alerts: OperationalAlertData;
  timeline: TimelineEvent[];
  lastAggregated: Date;
}
