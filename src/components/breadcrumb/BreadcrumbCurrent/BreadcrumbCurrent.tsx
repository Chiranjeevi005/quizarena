"use client";

import React from "react";
import { BreadcrumbCurrentProps } from "./BreadcrumbCurrent.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useBreadcrumb } from "@/providers/BreadcrumbProvider";

export function BreadcrumbCurrent({
  label,
  icon,
  truncated,
  className = "",
}: BreadcrumbCurrentProps) {
  const { compactMode } = useBreadcrumb();

  return (
    <li className={`inline-flex items-center min-w-0 ${className}`} aria-current="page">
      <span className="inline-flex items-center gap-1.5 text-primary font-medium">
        {icon && <Icon name={icon} className={`shrink-0 ${compactMode ? "w-3 h-3" : "w-4 h-4"}`} />}
        <span
          className={`${truncated ? "truncate max-w-[150px] md:max-w-[300px]" : ""} block`}
          title={truncated ? label : undefined}
        >
          {label}
        </span>
      </span>
    </li>
  );
}

ComponentRegistry.register({
  id: "breadcrumb-current",
  name: "BreadcrumbCurrent",
  category: "breadcrumb" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
