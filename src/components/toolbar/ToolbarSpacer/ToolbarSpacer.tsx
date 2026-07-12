"use client";

import React from "react";
import { ToolbarSpacerProps } from "./ToolbarSpacer.types";
import { ComponentRegistry } from "@/registry";

export function ToolbarSpacer({ className = "" }: ToolbarSpacerProps) {
  return <div className={`flex-1 ${className}`} aria-hidden="true" />;
}

ComponentRegistry.register({
  id: "toolbar-spacer",
  name: "ToolbarSpacer",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
