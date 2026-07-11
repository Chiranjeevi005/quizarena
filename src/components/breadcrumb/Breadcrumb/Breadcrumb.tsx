"use client";

import React from "react";
import { BreadcrumbProps } from "./Breadcrumb.types";
import { ComponentRegistry } from "@/registry";
import { useBreadcrumb } from "@/providers/BreadcrumbProvider";

export function Breadcrumb({
  children,
  className = "",
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  const { compactMode } = useBreadcrumb();

  return (
    <nav
      aria-label={ariaLabel}
      className={`flex w-full items-center ${compactMode ? "text-sm" : "text-base"} ${className}`}
    >
      <ol className="flex items-center w-full min-w-0">{children}</ol>
    </nav>
  );
}

ComponentRegistry.register({
  id: "breadcrumb",
  name: "Breadcrumb",
  category: "breadcrumb" as any, // Will add to ComponentCategory in Step 6
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
