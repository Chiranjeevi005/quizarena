import React from 'react';

export default function ExecutiveDashboardPage() {
  const score = 95.4;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl border border-emerald-100 shadow-sm">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Platform Intelligence Score</span>
          <span className="text-4xl font-bold text-emerald-600">{score}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Revenue" value="95" trend="+2.4%" />
        <MetricCard label="Growth" value="91" trend="+5.1%" />
        <MetricCard label="Governance" value="99" trend="+0.1%" />
        <MetricCard label="Operations" value="98" trend="-0.5%" />
        <MetricCard label="Engagement" value="87" trend="+1.2%" />
        <MetricCard label="Health" value="99" trend="+0.0%" />
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend }: { label: string, value: string, trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{trend}</span>
      </div>
    </div>
  );
}
