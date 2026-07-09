import React from "react";

export default function OperationsCommandCenterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Command Center</h1>
      <p className="text-gray-500">
        Centralized execution hub for critical operational interventions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommandCard
          title="Restart Worker"
          description="Safely restarts a specific asynchronous worker pool."
        />
        <CommandCard
          title="Pause Scheduler"
          description="Halts all cron jobs and recurring tasks."
        />
        <CommandCard
          title="Drain Queue"
          description="Forces the Dead Letter Queue to process immediately."
        />
        <CommandCard
          title="Rebuild Cache"
          description="Invalidates and repopulates the Analytics Cache."
        />
        <CommandCard
          title="Run Diagnostics"
          description="Executes a full sweep of the DiagnosticsEngine."
        />
        <CommandCard
          title="Run Certification"
          description="Executes the full operations:certify pipeline."
        />
      </div>
    </div>
  );
}

function CommandCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm hover:border-red-400 transition cursor-pointer">
      <div className="text-lg font-bold text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{description}</div>
      <button className="mt-4 px-4 py-2 bg-red-50 text-red-700 font-medium rounded border border-red-200 hover:bg-red-100">
        Execute
      </button>
    </div>
  );
}
