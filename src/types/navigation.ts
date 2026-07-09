import { IconName } from "@/icons/IconRegistry";

export type NavigationItemStatus = "stable" | "beta" | "alpha" | "deprecated";

export interface NavigationItem {
  id: string;
  title: string;
  description?: string;
  icon: IconName;
  href: string;
  permission?: string;
  featureFlag?: string;
  badge?: string;
  status?: NavigationItemStatus;
  group?: string;
  order?: number;
  hidden?: boolean;
  comingSoon?: boolean;
  external?: boolean;
  exact?: boolean;
}

export interface NavigationWorkspaceConfig {
  workspace: string; // e.g., 'super-admin', 'admin', 'moderator', 'user'
  permission?: string; // root permission required to see this workspace's nav
  items: NavigationItem[];
}
