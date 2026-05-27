import type {
  ChallengeStatus,
  ChallengeDifficulty,
  ViolationType,
  AttemptStatus,
} from "@/generated/prisma";

export type ChallengeHealthState = "HEALTHY" | "WARNING" | "DEGRADED" | "CRITICAL";

export type AlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface LiveParticipant {
  id: string;
  userId: string;
  name: string;
  status: AttemptStatus;
  startedAt: Date;
  submittedAt: Date | null;
  score: number;
  totalViolations: number;
  isFlagged: boolean;
}

export interface AntiCheatStats {
  tabSwitchCount: number;
  blurCount: number;
  copyAttempts: number;
  rightClicks: number;
  flaggedUsersCount: number;
  recentViolations: Array<{
    id: string;
    userId: string;
    userName: string;
    violationType: ViolationType;
    reportedAt: Date;
  }>;
}

export interface LiveChallenge {
  id: string;
  title: string;
  slug: string;
  difficulty: ChallengeDifficulty;
  status: ChallengeStatus;
  startsAt: Date | null;
  endsAt: Date | null;
  durationInMinutes: number;
  activeParticipants: number;
  completedParticipants: number;
  abandonedParticipants: number;
  healthState: ChallengeHealthState;
}

export interface TimelineEvent {
  id: string;
  challengeId: string;
  type: "START" | "SUBMISSION" | "VIOLATION" | "ANOMALY" | "DISCONNECT";
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  severity: AlertSeverity;
}

export interface OperationalAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: Date;
  source: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export interface InfrastructureStatus {
  timerSyncHealth: "HEALTHY" | "DEGRADED" | "CRITICAL";
  autosaveHealth: "HEALTHY" | "DEGRADED" | "CRITICAL";
  submissionPipelineHealth: "HEALTHY" | "DEGRADED" | "CRITICAL";
  lastCheckTime: Date;
}

export interface LiveOperationsDashboardData {
  liveChallenges: LiveChallenge[];
  alerts: OperationalAlert[];
  infrastructureStatus: InfrastructureStatus;
  recentActivity: TimelineEvent[];
  lastUpdated: Date;
}
