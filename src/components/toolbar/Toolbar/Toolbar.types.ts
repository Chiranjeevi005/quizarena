import React, { ReactNode } from "react";
import { ToolbarVariant } from "@/toolbar/ToolbarTypes";

export interface ToolbarProps {
  children?: ReactNode;
  className?: string;
  variant?: ToolbarVariant;
  "aria-label"?: string;
}
