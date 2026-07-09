"use client";

import React from "react";
import { ComponentRegistry } from "@/registry";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className = "" }: ToolbarProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}

ComponentRegistry.register({
  id: "layout-toolbar",
  name: "Toolbar",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
