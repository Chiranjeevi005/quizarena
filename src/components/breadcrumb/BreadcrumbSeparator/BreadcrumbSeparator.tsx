"use client";

import React from "react";
import { BreadcrumbSeparatorProps } from "./BreadcrumbSeparator.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useBreadcrumb } from "@/providers/BreadcrumbProvider";

export function BreadcrumbSeparator({
  variant = "chevron",
  className = "",
}: BreadcrumbSeparatorProps) {
  const { compactMode } = useBreadcrumb();
  const iconSize = compactMode ? 12 : 16;
  const spacing = compactMode ? "mx-1" : "mx-2";

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={`flex items-center text-gray-400 ${spacing} ${className}`}
    >
      {variant === "chevron" && <Icon name="ChevronRight" size={iconSize} />}
      {variant === "slash" && <span className="font-light text-gray-300">/</span>}
      {variant === "dot" && <span className="w-1 h-1 bg-gray-300 rounded-full inline-block" />}
    </li>
  );
}

ComponentRegistry.register({
  id: "breadcrumb-separator",
  name: "BreadcrumbSeparator",
  category: "breadcrumb" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
