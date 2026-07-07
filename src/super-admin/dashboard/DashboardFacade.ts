import { DashboardReadModel } from "./DashboardReadModel";

export class DashboardFacade {
  static async getDashboardData(): Promise<DashboardReadModel> {
    // Mock implementation for MVP
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            health: { status: "healthy", uptime: 99.99 },
            competitions: { active: 12, total: 45, newThisWeek: 3 },
            revenue: { currentMonth: 45000, previousMonth: 42000 },
            smes: { active: 8, total: 24 },
            candidates: { total: 15420, activeToday: 1240 },
            systemStatus: { load: 45, memory: 62 },
            isEmpty: false,
          }),
        800
      )
    );
  }
}
