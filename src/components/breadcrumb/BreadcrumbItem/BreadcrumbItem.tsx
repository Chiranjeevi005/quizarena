"use client";

import React from "react";
import { BreadcrumbItemProps } from "./BreadcrumbItem.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useBreadcrumb } from "@/providers/BreadcrumbProvider";

export function BreadcrumbItem({
  label,
  icon,
  current,
  disabled,
  hidden,
  truncated,
  className = "",
}: BreadcrumbItemProps) {
  const { compactMode } = useBreadcrumb();

  if (hidden) return null;

  return (
    <li
      className={`inline-flex items-center min-w-0 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      aria-current={current ? "page" : undefined}
    >
      <span
        className={`inline-flex items-center gap-1.5 transition-colors ${
          current ? "text-primary font-medium" : "text-secondary hover:text-primary"
        } ${disabled ? "pointer-events-none" : "cursor-pointer"}`}
      >
        {icon && <Icon name={icon} className={`shrink-0 ${compactMode ? "w-3 h-3" : "w-4 h-4"}`} />}
        <span
          className={`${truncated ? "truncate max-w-[120px] md:max-w-[200px]" : ""} block`}
          title={truncated ? label : undefined}
        >
          {label}
        </span>
      </span>
    </li>
  );
}

ComponentRegistry.register({
  id: "breadcrumb-item",
  name: "BreadcrumbItem",
  category: "breadcrumb" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
