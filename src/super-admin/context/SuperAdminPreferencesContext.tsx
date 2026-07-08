import React, { createContext, useContext, useState, ReactNode } from "react";
import { TelemetryGateway } from "../telemetry/TelemetryGateway";

export interface DashboardPreferences {
  pinnedWidgets: string[];
  hiddenWidgets: string[];
  collapsedWidgets: string[];
  layoutDensity: "compact" | "comfortable" | "spacious";
  widgetOrder: string[];
  favoritePages: string[];
  recentPages: string[];
  lastWorkspace: string;
}

interface SuperAdminPreferencesContextType {
  preferences: DashboardPreferences;
  updatePreference: <K extends keyof DashboardPreferences>(
    key: K,
    value: DashboardPreferences[K]
  ) => void;
  workspace: string;
  setWorkspace: (workspace: string) => void;
}

const defaultPreferences: DashboardPreferences = {
  pinnedWidgets: [],
  hiddenWidgets: [],
  collapsedWidgets: [],
  layoutDensity: "comfortable",
  widgetOrder: [],
  favoritePages: [],
  recentPages: [],
  lastWorkspace: "default",
};

const SuperAdminPreferencesContext = createContext<SuperAdminPreferencesContextType>({
  preferences: defaultPreferences,
  updatePreference: () => {},
  workspace: "default",
  setWorkspace: () => {},
});

export const SuperAdminPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<DashboardPreferences>(defaultPreferences);
  const [workspace, setWorkspaceState] = useState<string>("default");

  const updatePreference = <K extends keyof DashboardPreferences>(
    key: K,
    value: DashboardPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    TelemetryGateway.trackPreferenceChanged(key, value, workspace);
  };

  const setWorkspace = (newWorkspace: string) => {
    TelemetryGateway.trackWorkspaceChanged(workspace, newWorkspace);
    setWorkspaceState(newWorkspace);
    updatePreference("lastWorkspace", newWorkspace);
  };

  return (
    <SuperAdminPreferencesContext.Provider
      value={{ preferences, updatePreference, workspace, setWorkspace }}
    >
      {children}
    </SuperAdminPreferencesContext.Provider>
  );
};

export const useSuperAdminPreferences = () => useContext(SuperAdminPreferencesContext);
