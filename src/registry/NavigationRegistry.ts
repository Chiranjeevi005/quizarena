import { NavigationWorkspaceConfig, NavigationItem, Registry } from "@/types";

class NavigationRegistryImpl implements Registry<NavigationWorkspaceConfig> {
  private workspaces: Map<string, NavigationWorkspaceConfig> = new Map();

  register(config: NavigationWorkspaceConfig): void {
    if (this.workspaces.has(config.workspace)) {
      console.warn(
        `[NavigationRegistry] Workspace ${config.workspace} is already registered. Overwriting.`
      );
    }
    this.workspaces.set(config.workspace, config);
  }

  get(workspace: string): NavigationWorkspaceConfig | undefined {
    return this.workspaces.get(workspace);
  }

  getAll(): NavigationWorkspaceConfig[] {
    return Array.from(this.workspaces.values());
  }

  getItemsForWorkspace(workspace: string): NavigationItem[] {
    const config = this.get(workspace);
    return config ? config.items : [];
  }
}

export const NavigationRegistry = new NavigationRegistryImpl();

// Hardcoded registration of initial workspaces. In a real system, these might be loaded dynamically or registered by specific modules.
NavigationRegistry.register({
  workspace: "user",
  items: [
    {
      id: "user-home",
      title: "Workspace",
      icon: "LayoutDashboard",
      href: "/dashboard/home",
      exact: true,
      order: 10,
    },
    {
      id: "user-competitions",
      title: "Competitions",
      icon: "Trophy",
      href: "/dashboard/competitions",
      order: 20,
    },
  ],
});

NavigationRegistry.register({
  workspace: "moderator",
  items: [
    {
      id: "mod-home",
      title: "Dashboard",
      icon: "LayoutDashboard",
      href: "/dashboard/home",
      exact: true,
      order: 10,
    },
    {
      id: "mod-manage-challenges",
      title: "Manage Challenges",
      icon: "Trophy",
      href: "/dashboard/manage-challenges",
      order: 20,
    },
    {
      id: "mod-questions",
      title: "Question Bank",
      icon: "FileText",
      href: "/dashboard/questions",
      order: 30,
    },
    {
      id: "mod-content",
      title: "Content Queue",
      icon: "ClipboardList",
      href: "/dashboard/content",
      order: 40,
    },
  ],
});

NavigationRegistry.register({
  workspace: "admin",
  permission: "dashboard.admin",
  items: [
    {
      id: "admin-home",
      title: "Dashboard",
      icon: "LayoutDashboard",
      href: "/admin/dashboard",
      exact: true,
      group: "OPERATIONS",
      order: 10,
    },
    {
      id: "admin-users",
      title: "Users",
      icon: "Users",
      href: "/dashboard/admin/users",
      group: "OPERATIONS",
      order: 20,
    },
    {
      id: "admin-moderation",
      title: "Moderation",
      icon: "ShieldAlert",
      href: "/dashboard/admin/moderation",
      group: "OPERATIONS",
      order: 30,
    },
    {
      id: "admin-competitions",
      title: "Competitions",
      icon: "Trophy",
      href: "/admin/dashboard/competitions",
      group: "OPERATIONS",
      order: 40,
    },
    {
      id: "admin-question-bank",
      title: "Question Bank",
      icon: "BookOpen",
      href: "/dashboard/admin/question-bank",
      group: "QUESTION BANK",
      order: 50,
    },
    {
      id: "admin-intelligence",
      title: "Analytics",
      icon: "BarChart3",
      href: "/dashboard/admin/intelligence",
      group: "INTELLIGENCE",
      order: 60,
    },
    {
      id: "admin-monitoring",
      title: "Monitoring",
      icon: "Activity",
      href: "/dashboard/admin/monitoring",
      group: "INTELLIGENCE",
      order: 70,
    },
  ],
});

NavigationRegistry.register({
  workspace: "super-admin",
  permission: "dashboard.super-admin",
  items: [
    {
      id: "sa-home",
      title: "Command Center",
      icon: "LayoutDashboard",
      href: "/dashboard/super-admin/home",
      exact: true,
      order: 10,
    },
    {
      id: "sa-monitoring",
      title: "Monitoring",
      icon: "Activity",
      href: "/dashboard/super-admin/monitoring",
      order: 20,
    },
    {
      id: "sa-intelligence",
      title: "Intelligence",
      icon: "BarChart3",
      href: "/dashboard/super-admin/intelligence",
      order: 30,
    },
    {
      id: "sa-roles",
      title: "Role Management",
      icon: "Shield",
      href: "/dashboard/super-admin/roles",
      order: 40,
    },
  ],
});
