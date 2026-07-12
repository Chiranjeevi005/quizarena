import React, { ReactNode } from "react";
import { IconName } from "@/icons/IconRegistry";

export interface ToolbarGroupProps {
  id: string;
  icon?: IconName;
  label?: string;
  description?: string;
  divider?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  children?: ReactNode; // Typically ToolbarAction nodes
  className?: string;
}
