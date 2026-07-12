"use client";

import React from "react";
import { ActionBarProps } from "./ActionBar.types";
import { ComponentRegistry } from "@/registry";
import { useToolbar } from "@/providers/ToolbarProvider";

export function ActionBar({ leading, center, trailing, className = "" }: ActionBarProps) {
  const { orientation } = useToolbar();

  if (orientation === "vertical") {
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {leading && <div className="flex flex-col gap-2">{leading}</div>}
        {center && <div className="flex flex-col gap-2 mx-auto">{center}</div>}
        {trailing && <div className="flex flex-col gap-2 mt-auto">{trailing}</div>}
      </div>
    );
  }

  return (
    <div className={`flex items-center w-full min-w-0 ${className}`}>
      {leading && <div className="flex items-center gap-2 shrink-0">{leading}</div>}

      {center && (
        <div className="flex items-center gap-2 justify-center flex-1 min-w-0 px-2">{center}</div>
      )}

      {!center && leading && trailing && <div className="flex-1" />}

      {trailing && <div className="flex items-center gap-2 shrink-0 ml-auto">{trailing}</div>}
    </div>
  );
}

ComponentRegistry.register({
  id: "action-bar",
  name: "ActionBar",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
