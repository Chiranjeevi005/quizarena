import React from "react";
import { IconName } from "@/icons/IconRegistry";

export interface BreadcrumbCurrentProps {
  label: string;
  icon?: IconName;
  truncated?: boolean;
  className?: string;
}
