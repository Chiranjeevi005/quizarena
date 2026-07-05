import React from "react";

export function AlertCenter() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Active Alerts</h3>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          12 Alerts
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        <AlertRow
          type="SUBMISSION_DELAY"
          message="Submissions taking > 2000ms"
          count={142}
          lastSeen="1m ago"
          severity="Warning"
        />
        <AlertRow
          type="DEPLOYMENT_WARNING"
          message="Staging deployment took > 5m"
          count={1}
          lastSeen="12m ago"
          severity="Info"
        />
        <AlertRow
          type="HIGH_CPU"
          message="Worker CPU usage > 85%"
          count={4}
          lastSeen="15m ago"
          severity="Critical"
        />
      </div>

      <button className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
        View All Alerts
      </button>
    </div>
  );
}

function AlertRow({ type, message, count, lastSeen, severity }: any) {
  const getSeverityColor = () => {
    switch (severity) {
      case "Critical":
        return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      case "Warning":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className={`mt-0.5 p-1.5 rounded-md ${getSeverityColor()}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{type}</h4>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{lastSeen}</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">{message}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {count} occurrences
          </span>
          <div className="flex gap-2">
            <button className="text-[10px] font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
