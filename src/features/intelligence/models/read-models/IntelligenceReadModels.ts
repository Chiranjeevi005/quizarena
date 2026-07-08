export interface ExecutiveDashboardReadModel {
  intelligenceScore: number;
  revenue: number;
  activeUsers: number;
  activeCompetitions: number;
  registrations: number;
  conversionRate: number;
  completionRate: number;
  averageScore: number;
  growth: string;
}

export interface CompetitionAnalyticsReadModel {
  competitionId: string;
  funnel: {
    visitors: number;
    opened: number;
    registered: number;
    paid: number;
    started: number;
    completed: number;
    certificates: number;
    shared: number;
  };
  difficultyAnalytics: any;
  topicAnalytics: any;
  sectionAnalytics: any;
}

export interface AnalyticsTimelineReadModel {
  eventId: string;
  timestamp: Date;
  eventType: string;
  context: any;
}
