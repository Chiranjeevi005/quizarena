"use client";

import React, { useState } from 'react';
import { Activity, CheckCircle, AlertCircle, RefreshCw, Clock } from 'lucide-react';

interface Job {
  id: string;
  name: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  startedAt: string;
  duration?: string;
}

const mockJobs: Job[] = [
  { id: 'job-1', name: 'Evaluation Queue Processor', status: 'RUNNING', startedAt: '2 mins ago' },
  { id: 'job-2', name: 'Certificate Generation Queue', status: 'PENDING', startedAt: 'Waiting...' },
  { id: 'job-3', name: 'Notification Delivery Queue', status: 'COMPLETED', startedAt: '10 mins ago', duration: '45s' },
  { id: 'job-4', name: 'Data Cleanup Policy', status: 'FAILED', startedAt: '1 hour ago', duration: '5s' },
];

export function JobsDashboard() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'RUNNING': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'FAILED': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'PENDING': return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" /> Background Jobs
        </h2>
        <button 
          onClick={handleRefresh}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="p-0">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Job Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Started</th>
              <th className="px-4 py-3 text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-200">{job.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(job.status)}
                    <span className="text-xs">{job.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs">{job.startedAt}</td>
                <td className="px-4 py-3 text-right text-xs font-mono">{job.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
