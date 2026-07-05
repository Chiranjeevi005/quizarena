import React from "react";

export function WorkerMonitor() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Background Workers
      </h3>
      <div className="space-y-3">
        <WorkerRow name="Runtime Monitor Worker" status="Processing" metrics="120ms avg" />
        <WorkerRow name="Submission Worker" status="Idle" metrics="0 tasks" />
        <WorkerRow name="Snapshot Worker" status="Processing" metrics="2,341 queued" />
        <WorkerRow name="Leaderboard Worker" status="Idle" metrics="Last run: 2m ago" />
        <WorkerRow name="Rewards Worker" status="Idle" metrics="Last run: 5m ago" />
      </div>
    </div>
  );
}

function WorkerRow({ name, status, metrics }: { name: string; status: string; metrics: string }) {
  const isProcessing = status === "Processing";
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full ${isProcessing ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`}
        ></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{status}</span>
        <span className="text-[10px] text-gray-500">{metrics}</span>
      </div>
    </div>
  );
}
