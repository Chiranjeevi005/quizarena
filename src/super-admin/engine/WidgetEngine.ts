import React from "react";

export type WidgetState = "REGISTERED" | "LOADING" | "READY" | "REFRESHING" | "ERROR" | "DISABLED";
export type WidgetPermissionState = "VISIBLE" | "HIDDEN" | "DISABLED" | "LOCKED" | "COMING_SOON";

export interface DashboardWidgetManifest {
  id: string;
  title: string;
  description: string;
  permission?: string;
  priority: number;
  refreshInterval: number;
  category: string;
  provider: React.ComponentType<any>;
  defaultSize?: "small" | "medium" | "large" | "full";
  visibility?: WidgetPermissionState;
  version?: string;
  enabled?: boolean;
  experimental?: boolean;
  deprecated?: boolean;
  comingSoon?: boolean;
}

class WidgetEngineClass {
  private registry: Map<string, DashboardWidgetManifest> = new Map();
  private states: Map<string, WidgetState> = new Map();

  // 1. Registry
  register(manifest: DashboardWidgetManifest) {
    this.registry.set(manifest.id, {
      ...manifest,
      enabled: manifest.enabled ?? true,
      visibility: manifest.visibility ?? "VISIBLE",
      defaultSize: manifest.defaultSize ?? "medium",
    });
    this.states.set(manifest.id, "REGISTERED");
  }

  // 2. Resolver
  resolve(
    permissions: string[],
    capabilities: string[],
    featureFlags: Record<string, boolean>
  ): DashboardWidgetManifest[] {
    return Array.from(this.registry.values())
      .filter((w) => w.enabled)
      .map((w) => {
        let visibility = w.visibility;
        if (w.comingSoon || (w.experimental && !featureFlags.experimental)) {
          visibility = "COMING_SOON";
        } else if (w.permission && !permissions.includes(w.permission)) {
          visibility = "HIDDEN"; // Or LOCKED depending on policy
        }
        return { ...w, visibility };
      })
      .filter((w) => w.visibility !== "HIDDEN")
      .sort((a, b) => a.priority - b.priority);
  }

  // 3. Lifecycle
  updateState(id: string, state: WidgetState) {
    if (this.registry.has(id)) {
      this.states.set(id, state);
    }
  }

  getState(id: string): WidgetState {
    return this.states.get(id) || "ERROR";
  }

  getWidget(id: string): DashboardWidgetManifest | undefined {
    return this.registry.get(id);
  }
}

export const WidgetEngine = new WidgetEngineClass();
