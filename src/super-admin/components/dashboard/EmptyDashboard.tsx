import React from "react";
import { Rocket, Plus, Users, Settings } from "lucide-react";

export const EmptyDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
        <Rocket className="w-10 h-10 text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Welcome to QuizArena Super Admin</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Your platform is fully initialized but currently empty. Follow these steps to get started
        with your first competition.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
        <a
          href="/super-admin/settings"
          className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors group text-left"
        >
          <Settings className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 mb-4" />
          <h3 className="text-white font-medium mb-1">1. Configure Platform</h3>
          <p className="text-sm text-gray-500">
            Set up billing, domains, and global platform settings.
          </p>
        </a>

        <a
          href="/super-admin/people"
          className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors group text-left"
        >
          <Users className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 mb-4" />
          <h3 className="text-white font-medium mb-1">2. Invite SMEs</h3>
          <p className="text-sm text-gray-500">
            Add subject matter experts to create and review content.
          </p>
        </a>

        <a
          href="/super-admin/competitions"
          className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors group text-left"
        >
          <Plus className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 mb-4" />
          <h3 className="text-white font-medium mb-1">3. Create Competition</h3>
          <p className="text-sm text-gray-500">
            Launch your first tournament and invite candidates.
          </p>
        </a>
      </div>
    </div>
  );
};
