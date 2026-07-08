import {
  LucideIcon,
  LayoutDashboard,
  Trophy,
  Users,
  DollarSign,
  Activity,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: LucideIcon;
  permission?: string;
  category: "core" | "system" | "help";

  // Feature Flags
  enabled?: boolean;
  experimental?: boolean;
  deprecated?: boolean;
  comingSoon?: boolean;

  // Metadata
  badge?: string;
  beta?: boolean;
  hidden?: boolean;
  workspace?: string;
  parent?: string;
  priority?: number;
}

class NavigationRegistryClass {
  private items: Map<string, NavigationItem> = new Map();

  register(item: NavigationItem) {
    this.items.set(item.id, item);
  }

  getAll(): NavigationItem[] {
    return Array.from(this.items.values());
  }
}

export const NavigationRegistry = new NavigationRegistryClass();

// Register Default Items
NavigationRegistry.register({
  id: "dashboard",
  title: "Dashboard",
  path: "/super-admin",
  icon: LayoutDashboard,
  category: "core",
  permission: "view:dashboard",
});
NavigationRegistry.register({
  id: "competitions",
  title: "Competition",
  path: "/super-admin/competitions",
  icon: Trophy,
  category: "core",
  permission: "view:competitions",
});
NavigationRegistry.register({
  id: "people",
  title: "People",
  path: "/super-admin/people",
  icon: Users,
  category: "core",
  permission: "view:people",
});
NavigationRegistry.register({
  id: "finance",
  title: "Finance",
  path: "/super-admin/finance",
  icon: DollarSign,
  category: "core",
  permission: "view:finance",
});
NavigationRegistry.register({
  id: "operations",
  title: "Operations",
  path: "/super-admin/operations",
  icon: Activity,
  category: "system",
  permission: "view:operations",
});
NavigationRegistry.register({
  id: "settings",
  title: "Platform Settings",
  path: "/super-admin/settings",
  icon: Settings,
  category: "system",
  permission: "view:settings",
});
NavigationRegistry.register({
  id: "help",
  title: "Help & Support",
  path: "/super-admin/help",
  icon: HelpCircle,
  category: "help",
  permission: "view:help",
});
