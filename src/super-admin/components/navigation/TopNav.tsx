"use client";
import React from "react";
import { Menu, Bell, User, Search } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

import { useSuperAdminPreferences } from "../../context/SuperAdminPreferencesContext";
import { SuperAdminReadModel } from "../../models/SuperAdminReadModel";
import { ChevronDown, Activity as ActivityIcon } from "lucide-react";

export const TopNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user, environment } = useAdmin();
  const { workspace, setWorkspace } = useSuperAdminPreferences();
  const health = SuperAdminReadModel.getOverallHealth();

  return (
    <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>

        {/* Workspace Switcher Placeholder */}
        <div className="relative">
          <button className="flex items-center space-x-2 text-sm font-medium hover:bg-gray-900 px-2 py-1 rounded transition-colors">
            <span>{workspace === "default" ? "QuizArena" : workspace}</span>
            <span className="text-gray-500 text-xs">▼ Super Admin</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Dashboard Health Ribbon */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-900/50 border border-gray-800 rounded-full px-3 py-1">
          <ActivityIcon
            className={`w-3.5 h-3.5 ${
              health.status === "Healthy"
                ? "text-green-500"
                : health.status === "Warning"
                  ? "text-yellow-500"
                  : "text-red-500"
            }`}
          />
          <span className="text-xs text-gray-300 font-medium">
            Platform {health.status} {health.percentage}%
          </span>
        </div>

        {environment !== "production" && (
          <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded border border-yellow-500/20 font-medium hidden sm:inline-block">
            {environment.toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="flex items-center text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 transition-colors group"
          onClick={() =>
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))
          }
        >
          <Search className="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-300" />
          <span className="text-sm mr-4">Search...</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-500">
            ⌘K
          </kbd>
        </button>

        <button className="text-gray-400 hover:text-white relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border border-gray-950"></span>
        </button>

        <button className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-medium border border-indigo-500/30">
          {user?.name?.charAt(0) || "A"}
        </button>
      </div>
    </header>
  );
};
