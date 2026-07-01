import React from 'react';
import { ExecutiveKPIs } from '@/features/platform/operations/metrics/ExecutiveKPIs';
import { LiveCompetitionMonitor } from '@/features/platform/operations/monitoring/LiveCompetitionMonitor';
import { IncidentCenter } from '@/features/platform/operations/incidents/IncidentCenter';
import { AlertCenter } from '@/features/platform/operations/alerts/AlertCenter';
import { SystemHealthMonitor } from '@/features/platform/operations/health/SystemHealthMonitor';
import { WorkerMonitor } from '@/features/platform/operations/workers/WorkerMonitor';
import { OperationsHeatMap } from '@/features/platform/operations/metrics/OperationsHeatMap';
import { GlobalOperationsSearch } from '@/features/platform/operations/shared/GlobalOperationsSearch';

export function PlatformDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans">
      
      {/* Platform Header */}
      <header className="shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Platform Operations Center
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Global observability, health monitoring, and incident response.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <GlobalOperationsSearch />
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors">
            Export Report
          </button>
        </div>
      </header>

      {/* Main Dashboard Scrollable Area */}
      <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
        
        <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
          
          {/* Executive KPIs */}
          <section>
            <ExecutiveKPIs />
          </section>

          {/* System & Infrastructure Health */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemHealthMonitor />
            <WorkerMonitor />
          </section>

          {/* Incident & Alert Response */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncidentCenter />
            <AlertCenter />
          </section>

          {/* Activity Heatmaps */}
          <section>
            <OperationsHeatMap />
          </section>

          {/* Platform Engines (Runtime, Deployments, Leaderboard, Rewards, Certificates) */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <EngineStatusCard title="Runtime Engine" status="Healthy" />
            <EngineStatusCard title="Deployments" status="Healthy" />
            <EngineStatusCard title="Leaderboard" status="Healthy" />
            <EngineStatusCard title="Rewards" status="Warning" />
            <EngineStatusCard title="Certificates" status="Healthy" />
          </section>

          {/* Live Competitions Table */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Live Competitions Monitor</h2>
              <div className="flex gap-2">
                <select className="text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 shadow-sm">
                  <option>All Environments</option>
                  <option>Production</option>
                  <option>Staging</option>
                </select>
                <select className="text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 shadow-sm">
                  <option>Health: Any</option>
                  <option>Critical</option>
                  <option>Warning</option>
                </select>
              </div>
            </div>
            <LiveCompetitionMonitor />
          </section>

          {/* Audit Logs */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Operations Audit Log</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 text-center text-gray-500 text-sm">
              Audit logs are temporarily hidden. Use the export tool for full history.
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}

function EngineStatusCard({ title, status }: { title: string; status: string }) {
  const isWarning = status === 'Warning';
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h4>
      <div className={`mt-2 text-lg font-bold ${isWarning ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
        {status}
      </div>
    </div>
  );
}
