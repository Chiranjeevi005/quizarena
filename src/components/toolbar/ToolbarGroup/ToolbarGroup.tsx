"use client";

import React from "react";
import { ToolbarGroupProps } from "./ToolbarGroup.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useToolbar } from "@/providers/ToolbarProvider";
import { ToolbarDivider } from "../ToolbarDivider";

export function ToolbarGroup({
  id,
  icon,
  label,
  description,
  divider,
  collapsed,
  disabled,
  children,
  className = "",
}: ToolbarGroupProps) {
  const { visibleGroups, compactMode } = useToolbar();

  // If a group is supposed to be controlled by visibility context, hide it if not included.
  // We skip this check if visibleGroups is empty, assuming default visibility.
  if (visibleGroups.length > 0 && !visibleGroups.includes(id)) {
    return null;
  }

  if (collapsed) {
    return null; // A placeholder handling for actual collapsed state in menus
  }

  return (
    <div
      className={`flex items-center shrink-0 ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {(icon || label) && (
        <div className="flex flex-col mr-2 justify-center">
          <div className="flex items-center gap-1.5">
            {icon && (
              <Icon
                name={icon}
                className={`text-gray-500 ${compactMode ? "w-3 h-3" : "w-4 h-4"}`}
              />
            )}
            {label && (
              <span
                className={`font-semibold text-navy ${compactMode ? "text-[10px]" : "text-xs"} uppercase tracking-wider`}
              >
                {label}
              </span>
            )}
          </div>
          {description && !compactMode && (
            <span className="text-[10px] text-gray-400 mt-0.5">{description}</span>
          )}
        </div>
      )}
      <div className="flex items-center gap-1">{children}</div>
      {divider && <ToolbarDivider />}
    </div>
  );
}

ComponentRegistry.register({
  id: "toolbar-group",
  name: "ToolbarGroup",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
