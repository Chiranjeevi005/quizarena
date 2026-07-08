import React from "react";
import { IdentityDashboardAggregator } from "../../aggregators/IdentityDashboardAggregator";

export const IdentityOverviewDashboard = ({ workspaceId }: { workspaceId: string }) => {
  const data = IdentityDashboardAggregator.getDashboard(workspaceId);

  return (
    <div className="space-y-6">
      {/* Health Score */}
      <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-2">Identity Health Score</h2>
        <div className="text-4xl font-bold text-green-500">{data.health.score}/100</div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
          <div>Inactive Users: {data.health.inactiveUsers}</div>
          <div>Expired Invites: {data.health.expiredInvitations}</div>
          <div>Policy Violations: {data.health.policyViolations}</div>
          <div>Failed Logins: {data.health.failedLogins}</div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-red-400">Security Alerts</h3>
        <ul className="list-disc pl-5 space-y-2">
          {data.securityAlerts.map((alert, idx) => (
            <li key={idx} className="text-gray-300">
              {alert}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
