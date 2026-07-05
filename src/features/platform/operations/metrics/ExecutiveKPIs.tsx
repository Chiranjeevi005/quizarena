import React from "react";

export function ExecutiveKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Cards for MTTR, MTBF, Availability, Success Rate */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Platform Availability
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">99.99%</span>
        <div className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
          +0.01% from last month
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Mean Time To Recovery (MTTR)
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12m</span>
        <div className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
          -2m from last month
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Active Competitions
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,204</span>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Across 3 regions</div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Health</span>
        <span className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
          Excellent
        </span>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Score: 98/100</div>
      </div>
    </div>
  );
}
