import React from 'react';

export function SystemHealthMonitor() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">System Infrastructure</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Placeholder indicators */}
        <HealthIndicator name="Database" status="Healthy" />
        <HealthIndicator name="Redis Cache" status="Healthy" />
        <HealthIndicator name="Blob Storage" status="Healthy" />
        <HealthIndicator name="Auth Services" status="Healthy" />
      </div>
    </div>
  );
}

function HealthIndicator({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs font-semibold text-green-600 dark:text-green-400">{status}</span>
      </div>
    </div>
  );
}
