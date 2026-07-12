import { IconName } from "@/icons/IconRegistry";
import React, { ReactNode } from "react";

export type ToolbarEmptyStateVariant = "no-actions" | "loading" | "permission" | "workspace";

export interface ToolbarEmptyStateProps {
  variant?: ToolbarEmptyStateVariant;
  icon?: IconName;
  title?: string;
  description?: string;
  actionPlaceholder?: ReactNode;
  className?: string;
}
