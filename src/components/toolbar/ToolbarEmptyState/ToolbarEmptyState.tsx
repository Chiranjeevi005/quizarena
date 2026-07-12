"use client";

import React from "react";
import { ToolbarEmptyStateProps, ToolbarEmptyStateVariant } from "./ToolbarEmptyState.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { IconName } from "@/icons/IconRegistry";

export function ToolbarEmptyState({
  variant = "no-actions",
  icon,
  title,
  description,
  actionPlaceholder,
  className = "",
}: ToolbarEmptyStateProps) {
  // Default mappings based on variant
  let defaultIcon: IconName = "LayoutGrid";
  let defaultTitle = "No actions available";
  let defaultDescription = "There are no toolbar actions for this view.";

  switch (variant) {
    case "loading":
      defaultIcon = "Loader";
      defaultTitle = "Loading actions...";
      defaultDescription = "Please wait while we load the available actions.";
      break;
    case "permission":
      defaultIcon = "Lock";
      defaultTitle = "Access Restricted";
      defaultDescription = "You don't have permission to perform actions here.";
      break;
    case "workspace":
      defaultIcon = "Building";
      defaultTitle = "Select a Workspace";
      defaultDescription = "Please select a workspace to view its actions.";
      break;
    default:
      break;
  }

  const finalIcon = icon || defaultIcon;
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;

  return (
    <div
      className={`flex items-center gap-3 w-full py-2 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 ${className}`}
    >
      <div
        className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white text-gray-500 shadow-sm ${variant === "loading" ? "animate-spin" : ""}`}
      >
        <Icon name={finalIcon} className="w-4 h-4" />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-navy truncate">{finalTitle}</span>
        <span className="text-xs text-gray-500 truncate">{finalDescription}</span>
      </div>
      {actionPlaceholder && <div className="shrink-0 ml-auto">{actionPlaceholder}</div>}
    </div>
  );
}

ComponentRegistry.register({
  id: "toolbar-empty-state",
  name: "ToolbarEmptyState",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
