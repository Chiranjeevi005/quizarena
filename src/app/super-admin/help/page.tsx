import React from "react";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-500/10 rounded-xl">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Help & Support</h1>
          <p className="text-gray-400">Documentation and release notes</p>
        </div>
      </div>
      <div className="h-64 border border-dashed border-gray-800 rounded-xl flex items-center justify-center text-gray-500">
        Module Under Construction
      </div>
    </div>
  );
}
