import React from 'react';

export function OperationsHeatMap() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Platform Activity (Hourly)</h3>
      <div className="h-32 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
        <span className="text-sm text-gray-400 font-medium tracking-widest uppercase">Heatmap Visualization Placeholder</span>
      </div>
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>12:00 AM</span>
        <span>6:00 AM</span>
        <span>12:00 PM</span>
        <span>6:00 PM</span>
        <span>11:59 PM</span>
      </div>
    </div>
  );
}
