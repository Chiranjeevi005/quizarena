export interface DashboardReadModel {
  health: { status: "healthy" | "degraded" | "down"; uptime: number };
  competitions: { active: number; total: number; newThisWeek: number };
  revenue: { currentMonth: number; previousMonth: number };
  smes: { active: number; total: number };
  candidates: { total: number; activeToday: number };
  systemStatus: { load: number; memory: number };
  isEmpty: boolean;
}
