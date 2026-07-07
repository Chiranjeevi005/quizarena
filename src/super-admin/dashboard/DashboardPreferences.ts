export interface DashboardPreferences {
  theme: "light" | "dark" | "system";
  density: "comfortable" | "compact";
  sidebarState: "expanded" | "collapsed";
  pinnedWidgets: string[];
  hiddenWidgets: string[];
}

export const defaultPreferences: DashboardPreferences = {
  theme: "dark",
  density: "comfortable",
  sidebarState: "expanded",
  pinnedWidgets: [],
  hiddenWidgets: [],
};

export class DashboardPreferencesManager {
  static get(): DashboardPreferences {
    if (typeof window === "undefined") return defaultPreferences;
    const stored = localStorage.getItem("sa_preferences");
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  }
  static set(prefs: Partial<DashboardPreferences>) {
    if (typeof window === "undefined") return;
    const current = this.get();
    localStorage.setItem("sa_preferences", JSON.stringify({ ...current, ...prefs }));
  }
}
