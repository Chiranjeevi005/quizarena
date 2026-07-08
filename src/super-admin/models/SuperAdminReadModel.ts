import { HealthReadModel, HealthStatus } from "./HealthReadModel";
import { WidgetEngine, DashboardWidgetManifest } from "../engine/WidgetEngine";
import { AnnouncementRegistry, Announcement } from "../providers/AnnouncementProvider";
import { NavigationRegistry, NavigationItem } from "../registry/NavigationRegistry";
import { CommandRegistry, CommandManifest } from "../registry/CommandRegistry";
import { QuickActionRegistry, QuickActionManifest } from "../registry/QuickActionRegistry";

export interface SuperAdminDashboardMetadata {
  id: string;
  version: string;
  workspace: string;
  owner: string;
  category: string;
  visibility: "public" | "private" | "internal";
  experimental: boolean;
  searchWeight: number;
}

class SuperAdminReadModelClass {
  getHealth(): HealthStatus[] {
    return HealthReadModel.getAll();
  }

  getOverallHealth() {
    return HealthReadModel.getOverallStatus();
  }

  getAnnouncements(): Announcement[] {
    return AnnouncementRegistry.getAll();
  }

  getNavigation(): NavigationItem[] {
    return NavigationRegistry.getAll();
  }

  getWidgets(
    permissions: string[],
    capabilities: string[],
    featureFlags: Record<string, boolean>
  ): DashboardWidgetManifest[] {
    return WidgetEngine.resolve(permissions, capabilities, featureFlags);
  }

  getCommands(): CommandManifest[] {
    return CommandRegistry.getAll();
  }

  getQuickActions(): QuickActionManifest[] {
    return QuickActionRegistry.getAll();
  }

  getMetadata(workspace: string): SuperAdminDashboardMetadata {
    return {
      id: `dashboard-${workspace}`,
      version: "1.0.0",
      workspace,
      owner: "SuperAdminKernel",
      category: "core",
      visibility: "internal",
      experimental: false,
      searchWeight: 100,
    };
  }
}

export const SuperAdminReadModel = new SuperAdminReadModelClass();
