import React from "react";
import { DashboardPreferencesManager } from "./DashboardPreferences";

export const DashboardLayoutEngine = ({ children }: { children: React.ReactNode }) => {
  const prefs = DashboardPreferencesManager.get();

  return (
    <div
      className={`grid gap-6 p-6 ${prefs.density === "comfortable" ? "gap-6 p-6" : "gap-4 p-4"}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-inherit auto-rows-min">
        {children}
      </div>
    </div>
  );
};
