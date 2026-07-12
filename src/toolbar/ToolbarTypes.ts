import { IconName } from "@/icons/IconRegistry";

export type ToolbarVariant = "default" | "dense" | "compact" | "floating" | "inline";
export type ToolbarOrientation = "horizontal" | "vertical";
export type ToolbarOverflowMode = "collapse" | "scroll" | "wrap";
export type ToolbarSize = "sm" | "md" | "lg";

export interface ToolbarAction {
  id: string;
  icon?: IconName;
  label?: string;
  active?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  badge?: string | number;
  counter?: number;
  favorite?: boolean;
  danger?: boolean;
  onAction?: () => void;
}

export interface ToolbarGroup {
  id: string;
  icon?: IconName;
  label?: string;
  description?: string;
  divider?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  actions: ToolbarAction[];
}
