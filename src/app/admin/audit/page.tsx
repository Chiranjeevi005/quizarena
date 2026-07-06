"use client";

import React, { useState } from 'react';
import { Shield, Filter, Download } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  actor: string;
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

const mockLogs: AuditLog[] = [
  { id: 'log-1', action: 'USER_ROLE_CHANGED', entity: 'User:alice', actor: 'SuperAdmin', timestamp: '10 mins ago', severity: 'HIGH' },
  { id: 'log-2', action: 'COMPETITION_PUBLISHED', entity: 'Comp:cs-101', actor: 'Alice', timestamp: '1 hour ago', severity: 'MEDIUM' },
  { id: 'log-3', action: 'LOGIN_FAILED', entity: 'Auth', actor: 'Unknown IP', timestamp: '2 hours ago', severity: 'LOW' },
];

export default function AdminAuditPage() {
  const [logs] = useState<AuditLog[]>(mockLogs);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-semibold">CRITICAL</span>;
      case 'HIGH': return <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-semibold">HIGH</span>;
      case 'MEDIUM': return <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-semibold">MEDIUM</span>;
      default: return <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">LOW</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-400" />
            Audit Explorer
          </h2>
          <p className="text-gray-400 text-sm">Track system changes, security events, and administrative actions.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-3 py-2 text-sm font-medium rounded transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex items-center gap-4 bg-gray-950">
          <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1.5 text-sm rounded">
            <Filter className="w-4 h-4" /> Filter by Entity
          </button>
          <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1.5 text-sm rounded">
            <Filter className="w-4 h-4" /> Filter by Severity
          </button>
        </div>
        
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Entity</th>
              <th className="px-6 py-3">Actor</th>
              <th className="px-6 py-3">Severity</th>
              <th className="px-6 py-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-200">{log.action}</td>
                <td className="px-6 py-3 text-gray-400">{log.entity}</td>
                <td className="px-6 py-3">{log.actor}</td>
                <td className="px-6 py-3">{getSeverityBadge(log.severity)}</td>
                <td className="px-6 py-3 text-right text-xs text-gray-500">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
