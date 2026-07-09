"use client";

import React from "react";
import { ComponentRegistry } from "@/registry";

interface WorkspaceHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export function WorkspaceHeader({ title, description, children }: WorkspaceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        {typeof title === "string" ? (
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">{title}</h1>
        ) : (
          title
        )}

        {description && (
          <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
    </div>
  );
}

ComponentRegistry.register({
  id: "layout-workspace-header",
  name: "WorkspaceHeader",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
