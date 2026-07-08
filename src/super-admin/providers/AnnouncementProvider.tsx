import React, { createContext, useContext, useState, useEffect } from "react";
import { TelemetryGateway } from "../telemetry/TelemetryGateway";
import { useSuperAdminPreferences } from "../context/SuperAdminPreferencesContext";

export type AnnouncementType = "maintenance" | "finance" | "security" | "release" | "incident";

export interface Announcement {
  id: string;
  type: AnnouncementType;
  title: string;
  message: string;
  link?: string;
  dismissible: boolean;
}

class AnnouncementRegistryClass {
  private announcements: Map<string, Announcement> = new Map();

  register(announcement: Announcement) {
    this.announcements.set(announcement.id, announcement);
  }

  getAll(): Announcement[] {
    return Array.from(this.announcements.values());
  }
}

export const AnnouncementRegistry = new AnnouncementRegistryClass();

// Mock Initial Data
AnnouncementRegistry.register({
  id: "v1-release",
  type: "release",
  title: "Super Admin Platform v1.0",
  message: "Welcome to the new Super Admin Platform. SA-01 architecture is locked.",
  dismissible: true,
});

interface AnnouncementContextType {
  activeAnnouncements: Announcement[];
  dismiss: (id: string) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType>({
  activeAnnouncements: [],
  dismiss: () => {},
});

export const AnnouncementProvider = ({ children }: { children: React.ReactNode }) => {
  const { workspace } = useSuperAdminPreferences();
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const activeAnnouncements = AnnouncementRegistry.getAll().filter((a) => !dismissedIds.has(a.id));

  const dismiss = (id: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    TelemetryGateway.trackAnnouncementDismissed(id, workspace);
  };

  return (
    <AnnouncementContext.Provider value={{ activeAnnouncements, dismiss }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => useContext(AnnouncementContext);
