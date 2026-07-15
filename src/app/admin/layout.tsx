"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Trophy, BarChart3, Settings, Menu, X, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Competitions", href: "/admin/competitions", icon: Trophy },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-100 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-[#121214] z-50">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Organizer
        </span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-40 w-64 h-[calc(100vh-65px)] md:h-screen bg-[#121214] border-r border-gray-800/60 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="hidden md:flex items-center justify-center h-20 border-b border-gray-800/60 bg-black/20">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
            Organizer
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon size={20} className={isActive ? "text-indigo-400" : "text-gray-500"} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800/60 bg-black/20">
          <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all duration-200">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0A0A0B] to-[#121214] relative h-[calc(100vh-65px)] md:h-screen">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0B] to-[#0A0A0B]"></div>
        <div className="relative z-10 w-full h-full">{children}</div>
      </main>
    </div>
  );
}
