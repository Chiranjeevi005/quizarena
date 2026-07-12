"use client";

import React from "react";
import { ToolbarProps } from "./Toolbar.types";
import { ComponentRegistry } from "@/registry";
import { useToolbar } from "@/providers/ToolbarProvider";

export function Toolbar({
  children,
  className = "",
  variant = "default",
  "aria-label": ariaLabel = "Toolbar",
}: ToolbarProps) {
  const { compactMode, orientation } = useToolbar();

  const baseStyles = "flex items-center w-full transition-all duration-200 z-10";
  const orientationStyles = orientation === "horizontal" ? "flex-row" : "flex-col";

  let variantStyles = "";
  if (variant === "default") {
    variantStyles = "bg-white border-b border-gray-200 px-4 h-14";
  } else if (variant === "dense") {
    variantStyles = "bg-white border-b border-gray-200 px-2 h-10";
  } else if (variant === "compact") {
    variantStyles = "bg-transparent px-2 h-12";
  } else if (variant === "floating") {
    variantStyles =
      "bg-white rounded-full shadow-lg border border-gray-100 px-4 h-12 w-fit mx-auto sticky top-4";
  } else if (variant === "inline") {
    variantStyles = "bg-transparent h-auto";
  }

  // Override size via compact mode context if necessary
  if (compactMode && (variant === "default" || variant === "floating")) {
    variantStyles = variantStyles.replace("h-14", "h-10").replace("h-12", "h-10");
  }

  return (
    <div
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      className={`${baseStyles} ${orientationStyles} ${variantStyles} ${className}`}
    >
      <div
        className={`flex items-center w-full min-w-0 ${orientation === "horizontal" ? "gap-2" : "flex-col gap-2"}`}
      >
        {children}
      </div>
    </div>
  );
}

ComponentRegistry.register({
  id: "toolbar",
  name: "Toolbar",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
