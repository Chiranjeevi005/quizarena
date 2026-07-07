import React from "react";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gray-800 rounded-xl">
          <Settings className="w-6 h-6 text-gray-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
          <p className="text-gray-400">Global configuration and security</p>
        </div>
      </div>
      <div className="h-64 border border-dashed border-gray-800 rounded-xl flex items-center justify-center text-gray-500">
        Module Under Construction
      </div>
    </div>
  );
}
