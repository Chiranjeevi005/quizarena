"use client";
import React, { useState } from "react";
import { AdminProvider } from "../../super-admin/context/AdminContext";
import { Sidebar } from "../../super-admin/components/navigation/Sidebar";
import { TopNav } from "../../super-admin/components/navigation/TopNav";
import { CommandPalette } from "../../super-admin/components/CommandPalette";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="min-h-screen bg-black text-gray-100 flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopNav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 overflow-y-auto bg-black">{children}</main>
        </div>

        <CommandPalette />
      </div>
    </AdminProvider>
  );
}
