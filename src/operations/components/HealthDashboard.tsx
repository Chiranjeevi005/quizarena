"use client";

import React from 'react';
import { Server, Database, Cpu, HardDrive } from 'lucide-react';

interface Metric {
  name: string;
  value: string;
  status: 'optimal' | 'warning' | 'critical';
  icon: React.ElementType;
}

const metrics: Metric[] = [
  { name: 'API Latency', value: '45ms', status: 'optimal', icon: Server },
  { name: 'Database Connections', value: '12 / 100', status: 'optimal', icon: Database },
  { name: 'CPU Load', value: '78%', status: 'warning', icon: Cpu },
  { name: 'Memory Usage', value: '62%', status: 'optimal', icon: HardDrive },
];

export function HealthDashboard() {
  const getStatusColor = (status: Metric['status']) => {
    switch(status) {
      case 'optimal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map(metric => {
        const Icon = metric.icon;
        return (
          <div key={metric.name} className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{metric.name}</p>
              <h3 className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>{metric.value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-gray-800/50 ${getStatusColor(metric.status)}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
