import React from 'react';

export function IncidentCenter() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Incident Center</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">2 Open</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        <IncidentRow 
          title="Submission Queue Backlogged"
          competition="Summer Coding Challenge"
          status="Investigating"
          detected="10m ago"
          severity="Critical"
        />
        <IncidentRow 
          title="Leaderboard Sync Delay"
          competition="Weekly Math Sprint"
          status="Recovered"
          detected="25m ago"
          severity="Warning"
        />
      </div>
      
      <button className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
        View All Incidents
      </button>
    </div>
  );
}

function IncidentRow({ title, competition, status, detected, severity }: any) {
  const isCritical = severity === 'Critical';
  const isRecovered = status === 'Recovered';
  
  return (
    <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="flex justify-between items-start mb-1">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isCritical ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
          {severity}
        </span>
        <span className="text-xs text-gray-500">{detected}</span>
      </div>
      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</h4>
      <div className="text-xs text-gray-500 mt-1">{competition}</div>
      <div className="mt-2 flex items-center justify-between">
        <span className={`text-xs font-medium flex items-center gap-1 ${isRecovered ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isRecovered ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          {status}
        </span>
        {!isRecovered && <button className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Acknowledge</button>}
        {isRecovered && <button className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Resolve</button>}
      </div>
    </div>
  );
}
