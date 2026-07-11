"use client";

import React from "react";
import { BreadcrumbOverflowProps } from "./BreadcrumbOverflow.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useBreadcrumb } from "@/providers/BreadcrumbProvider";

export function BreadcrumbOverflow({ collapsedRenderer, className = "" }: BreadcrumbOverflowProps) {
  const { compactMode } = useBreadcrumb();

  return (
    <li className={`inline-flex items-center min-w-0 ${className}`}>
      <span
        role="button"
        aria-label="More items"
        aria-expanded="false"
        aria-haspopup="true"
        className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
      >
        {collapsedRenderer ? (
          collapsedRenderer
        ) : (
          <Icon name="MoreHorizontal" className={compactMode ? "w-3 h-3" : "w-4 h-4"} />
        )}
      </span>
    </li>
  );
}

ComponentRegistry.register({
  id: "breadcrumb-overflow",
  name: "BreadcrumbOverflow",
  category: "breadcrumb" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
