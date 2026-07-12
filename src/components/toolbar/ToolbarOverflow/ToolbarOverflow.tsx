"use client";

import React, { useState } from "react";
import { ToolbarOverflowProps } from "./ToolbarOverflow.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useToolbar } from "@/providers/ToolbarProvider";

export function ToolbarOverflow({ children, className = "" }: ToolbarOverflowProps) {
  const { compactMode, overflowVisible, setOverflowVisible } = useToolbar();

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={overflowVisible}
        aria-label="More toolbar actions"
        onClick={() => setOverflowVisible(!overflowVisible)}
        className={`flex items-center justify-center shrink-0 rounded-md transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary ${
          compactMode ? "w-7 h-7" : "w-8 h-8"
        } ${overflowVisible ? "bg-gray-100 text-gray-900" : ""}`}
      >
        <Icon name="MoreHorizontal" className={compactMode ? "w-4 h-4" : "w-5 h-5"} />
      </button>

      {/* Overflow Dropdown Placeholder */}
      {overflowVisible && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-1">
            More Actions
          </div>
          {children || (
            <div className="px-4 py-2 text-sm text-gray-500 italic">No overflow actions</div>
          )}
        </div>
      )}
    </div>
  );
}

ComponentRegistry.register({
  id: "toolbar-overflow",
  name: "ToolbarOverflow",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
