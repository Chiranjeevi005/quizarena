import React from "react";

export interface DashboardWidgetManifest {
  id: string;
  title: string;
  description: string;
  permission?: string;
  priority: number;
  refreshInterval: number;
  category: string;
  provider: React.ComponentType<any>;
}

class WidgetRegistryClass {
  private widgets: Map<string, DashboardWidgetManifest> = new Map();

  register(manifest: DashboardWidgetManifest) {
    this.widgets.set(manifest.id, manifest);
  }

  getAll(): DashboardWidgetManifest[] {
    return Array.from(this.widgets.values()).sort((a, b) => a.priority - b.priority);
  }
}

export const WidgetRegistry = new WidgetRegistryClass();
