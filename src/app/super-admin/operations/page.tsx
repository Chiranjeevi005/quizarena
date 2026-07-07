import React from "react";
import { Activity } from "lucide-react";

export default function OperationsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-xl">
          <Activity className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Operations</h1>
          <p className="text-gray-400">Platform Health, Incidents, and Deployments</p>
        </div>
      </div>
      <div className="h-64 border border-dashed border-gray-800 rounded-xl flex items-center justify-center text-gray-500">
        Module Under Construction
      </div>
    </div>
  );
}
