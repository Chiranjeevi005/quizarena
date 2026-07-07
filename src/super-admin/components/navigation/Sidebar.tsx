"use client";
import React from "react";
import { useAdmin } from "../../context/AdminContext";
import { NavigationRegistry } from "../../registry/NavigationRegistry";
import { PermissionResolver } from "../../registry/PermissionResolver";
import { DashboardPreferencesManager } from "../../dashboard/DashboardPreferences";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const { permissions } = useAdmin();
  const pathname = usePathname();
  const prefs = DashboardPreferencesManager.get();

  const allItems = NavigationRegistry.getAll();
  const availableItems = PermissionResolver.resolve(allItems, permissions);

  const categories = {
    core: availableItems.filter((i) => i.category === "core"),
    system: availableItems.filter((i) => i.category === "system"),
    help: availableItems.filter((i) => i.category === "help"),
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-950 border-r border-gray-800
        flex flex-col transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-800 justify-between">
          <Link
            href="/super-admin"
            className="font-bold text-lg bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
          >
            QuizArena Admin
          </Link>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
          <div className="space-y-1">
            {categories.core.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive ? "bg-indigo-500/10 text-indigo-400 font-medium" : "text-gray-400 hover:text-white hover:bg-gray-900"}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              System
            </h4>
            {categories.system.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive ? "bg-indigo-500/10 text-indigo-400 font-medium" : "text-gray-400 hover:text-white hover:bg-gray-900"}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-auto pt-4 border-t border-gray-800">
            {categories.help.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`
                     flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors
                     ${isActive ? "bg-indigo-500/10 text-indigo-400 font-medium" : "text-gray-400 hover:text-white hover:bg-gray-900"}
                   `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
