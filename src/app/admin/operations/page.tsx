import React from 'react';
import { JobsDashboard } from '../../../operations/components/JobsDashboard';
import { HealthDashboard } from '../../../operations/components/HealthDashboard';

export default function OperationsCenterPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Operations Center</h2>
        <p className="text-gray-400 text-sm">Monitor platform health, queue processing, and system operations in real-time.</p>
      </div>
      
      <HealthDashboard />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <JobsDashboard />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-4 flex flex-col justify-center items-center text-center">
          <p className="text-gray-400 mb-4">Operations Metrics Read Model</p>
          <div className="w-full h-48 bg-gray-950 border border-gray-800 rounded flex items-center justify-center">
            <span className="text-gray-600 text-sm">[Chart Visualization Placeholder]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
