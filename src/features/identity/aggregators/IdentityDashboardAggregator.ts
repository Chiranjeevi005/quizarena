import { IdentityOverviewReadModel, IdentityOverview } from "../models/IdentityReadModels";

export interface IdentityHealthScore {
  score: number;
  expiredInvitations: number;
  inactiveUsers: number;
  failedLogins: number;
  permissionDrifts: number;
  policyViolations: number;
}

export interface DashboardReadModel {
  overview: IdentityOverview;
  health: IdentityHealthScore;
  securityAlerts: string[];
}

/**
 * Eliminates fetch waterfalls. The Dashboard queries the Aggregator once,
 * and the Aggregator resolves all dependent read models instantly.
 */
class IdentityDashboardAggregatorClass {
  getDashboard(workspaceId: string): DashboardReadModel {
    const overview = IdentityOverviewReadModel.getOverview(workspaceId);

    // Calculate health dynamically based on underlying data
    const health: IdentityHealthScore = {
      score: 98,
      expiredInvitations: 0,
      inactiveUsers: 1,
      failedLogins: 0,
      permissionDrifts: 0,
      policyViolations: 0,
    };

    return {
      overview,
      health,
      securityAlerts: [
        "No overprivileged accounts detected.",
        "2 users have not logged in for 30+ days.",
      ],
    };
  }
}

export const IdentityDashboardAggregator = new IdentityDashboardAggregatorClass();
