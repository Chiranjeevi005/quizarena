"use client";

import React from "react";
import { ToolbarDividerProps } from "./ToolbarDivider.types";
import { ComponentRegistry } from "@/registry";
import { useToolbar } from "@/providers/ToolbarProvider";

export function ToolbarDivider({ className = "" }: ToolbarDividerProps) {
  const { orientation, compactMode } = useToolbar();

  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        className={`w-full h-px bg-gray-200 ${compactMode ? "my-1" : "my-2"} ${className}`}
      />
    );
  }

  return (
    <div
      role="separator"
      className={`h-full min-h-[24px] w-px bg-gray-200 ${compactMode ? "mx-1" : "mx-2"} ${className}`}
    />
  );
}

ComponentRegistry.register({
  id: "toolbar-divider",
  name: "ToolbarDivider",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
