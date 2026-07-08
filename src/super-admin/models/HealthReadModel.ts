export interface HealthStatus {
  service: string;
  status: "Healthy" | "Warning" | "Critical" | "Unknown";
  uptimePercentage: number;
  message?: string;
}

class HealthReadModelClass {
  private statuses: Map<string, HealthStatus> = new Map();

  constructor() {
    // Mock initial data
    this.updateStatus({ service: "Platform", status: "Healthy", uptimePercentage: 99.9 });
    this.updateStatus({ service: "Competitions", status: "Healthy", uptimePercentage: 99.5 });
    this.updateStatus({ service: "Finance", status: "Healthy", uptimePercentage: 100 });
    this.updateStatus({
      service: "Workers",
      status: "Warning",
      uptimePercentage: 98.2,
      message: "High latency detected",
    });
    this.updateStatus({ service: "Notifications", status: "Healthy", uptimePercentage: 99.9 });
    this.updateStatus({ service: "Storage", status: "Healthy", uptimePercentage: 99.99 });
  }

  updateStatus(status: HealthStatus) {
    this.statuses.set(status.service, status);
  }

  getAll(): HealthStatus[] {
    return Array.from(this.statuses.values());
  }

  getOverallStatus(): {
    status: "Healthy" | "Warning" | "Critical";
    percentage: number;
    warnings: number;
    critical: number;
  } {
    const all = this.getAll();
    if (all.length === 0) return { status: "Healthy", percentage: 100, warnings: 0, critical: 0 };

    let warnings = 0;
    let critical = 0;
    let totalUptime = 0;

    all.forEach((s) => {
      if (s.status === "Warning") warnings++;
      if (s.status === "Critical") critical++;
      totalUptime += s.uptimePercentage;
    });

    const percentage = totalUptime / all.length;
    const status = critical > 0 ? "Critical" : warnings > 0 ? "Warning" : "Healthy";

    return { status, percentage, warnings, critical };
  }
}

export const HealthReadModel = new HealthReadModelClass();
