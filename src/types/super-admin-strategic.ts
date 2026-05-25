/**
 * QuizArena — Sovereign Strategic Intelligence Types
 *
 * This file defines the core types for executive business oversight,
 * strategic anomaly detection, and operational intelligence.
 *
 * ALL types here are for SUPER_ADMIN governance systems ONLY.
 */

/**
 * Strategic Health Classification
 * Indicates the high-level operational and business trajectory.
 */
export type StrategicHealthState = "STABLE" | "WATCH" | "DECLINING" | "CRITICAL";

/**
 * High-level Executive KPIs
 * Core metrics for business oversight.
 */
export interface BusinessKPIs {
  totalUsers: number;
  activeSubscriptions: number;
  mrrAmount: number; // Monthly Recurring Revenue
  mrrGrowthVelocity: number; // Percentage growth/decline
  churnRate: number; // Percentage
  retentionRate: number; // Percentage
}

/**
 * Operational Efficiency Metrics
 * Measures systemic throughput and platform bottlenecks.
 */
export interface OperationalEfficiency {
  moderationThroughputAvg: number; // items processed per hour
  publishingTrend: number; // new challenges per week
  infrastructureUptime: number; // percentage
  apiLatencyAvgMs: number; // milliseconds
}

/**
 * AI-Style Strategic Insight
 * Automated insights generated from platform data.
 */
export interface StrategicInsight {
  id: string;
  content: string;
  category: "RETENTION" | "ENGAGEMENT" | "OPERATIONAL" | "MONETIZATION";
  severity: "NEUTRAL" | "WARNING" | "CRITICAL" | "POSITIVE";
  recommendedWorkflowName: string;
  recommendedWorkflowHref: string;
}

/**
 * Executive Business Anomaly
 * Unpredicted spikes, drops, or operational risks.
 */
export interface BusinessAnomaly {
  id: string;
  metric: string;
  deviation: string; // e.g., "-11%"
  description: string;
  detectedAt: string;
  isActive: boolean;
  severity: "WARNING" | "CRITICAL";
}

/**
 * Strategic Overview Aggregation
 * The master object feeding the executive command center.
 */
export interface StrategicOverview {
  healthState: StrategicHealthState;
  kpis: BusinessKPIs;
  efficiency: OperationalEfficiency;
  insights: StrategicInsight[];
  anomalies: BusinessAnomaly[];
  lastUpdated: string;
}
