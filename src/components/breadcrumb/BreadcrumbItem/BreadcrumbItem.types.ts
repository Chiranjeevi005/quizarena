import React from "react";
import { IconName } from "@/icons/IconRegistry";

export interface BreadcrumbItemProps {
  label: string;
  icon?: IconName;
  current?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  truncated?: boolean;
  className?: string;
}
