import React, { useState } from "react";
import { AdminProvider } from "../context/AdminContext";
import { SuperAdminPreferencesProvider } from "../context/SuperAdminPreferencesContext";
import { ThemeProvider } from "../theme/ThemeProvider";
import { AnnouncementProvider, useAnnouncements } from "../providers/AnnouncementProvider";
import { Sidebar } from "../components/navigation/Sidebar";
import { TopNav } from "../components/navigation/TopNav";
import { CommandPalette } from "../components/CommandPalette";
import { AlertCircle, X } from "lucide-react";

const AnnouncementBanner = () => {
  const { activeAnnouncements, dismiss } = useAnnouncements();

  if (activeAnnouncements.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {activeAnnouncements.map((announcement) => (
        <div
          key={announcement.id}
          className={`flex items-center justify-between px-4 py-2 text-sm ${
            announcement.type === "incident" || announcement.type === "security"
              ? "bg-red-900/90 text-red-100"
              : announcement.type === "maintenance"
                ? "bg-yellow-900/90 text-yellow-100"
                : "bg-blue-900/90 text-blue-100"
          }`}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span className="font-semibold">{announcement.title}:</span>
            <span>{announcement.message}</span>
            {announcement.link && (
              <a href={announcement.link} className="underline ml-2 hover:text-white">
                Learn more
              </a>
            )}
          </div>
          {announcement.dismissible && (
            <button
              onClick={() => dismiss(announcement.id)}
              className="p-1 hover:bg-black/20 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export const SuperAdminShellKernel = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <SuperAdminPreferencesProvider>
        <AdminProvider>
          <AnnouncementProvider>
            <div className="min-h-screen bg-black text-gray-100 flex flex-col overflow-hidden">
              <AnnouncementBanner />

              <div className="flex-1 flex overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                  <TopNav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                  <main className="flex-1 overflow-y-auto bg-black relative">{children}</main>
                </div>
              </div>

              <CommandPalette />
            </div>
          </AnnouncementProvider>
        </AdminProvider>
      </SuperAdminPreferencesProvider>
    </ThemeProvider>
  );
};
