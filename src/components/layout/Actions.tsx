"use client";

import React from "react";
import { ComponentRegistry } from "@/registry";

interface ActionsProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  destructive?: React.ReactNode;
  className?: string;
}

export function Actions({ primary, secondary, destructive, className = "" }: ActionsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {secondary && <div className="flex items-center gap-2">{secondary}</div>}
      {primary && <div className="flex items-center gap-2">{primary}</div>}
      {destructive && (
        <>
          {(primary || secondary) && <div className="w-px h-6 bg-gray-200 mx-1" />}
          <div className="flex items-center gap-2">{destructive}</div>
        </>
      )}
    </div>
  );
}

ComponentRegistry.register({
  id: "layout-actions",
  name: "Actions",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
