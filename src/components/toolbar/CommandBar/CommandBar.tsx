"use client";

import React from "react";
import { CommandBarProps } from "./CommandBar.types";
import { ComponentRegistry } from "@/registry";
import { useToolbar } from "@/providers/ToolbarProvider";
import { Icon } from "@/icons/Icon";

export function CommandBar({
  state = "idle",
  inputSlot,
  leadingIconSlot,
  trailingActionsSlot,
  resultsSlot,
  suggestionsSlot,
  emptySlot,
  className = "",
}: CommandBarProps) {
  const { compactMode } = useToolbar();

  let stateStyles = "border-gray-300 bg-white";
  let iconColor = "text-gray-400";

  if (state === "focused") {
    stateStyles = "border-primary ring-1 ring-primary shadow-sm bg-white";
    iconColor = "text-primary";
  } else if (state === "disabled") {
    stateStyles = "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed";
  } else if (state === "error") {
    stateStyles = "border-red-500 bg-red-50 ring-1 ring-red-500";
    iconColor = "text-red-500";
  } else if (state === "loading") {
    stateStyles = "border-gray-300 bg-gray-50";
  }

  const showDropdown = state === "focused" && (resultsSlot || suggestionsSlot || emptySlot);

  return (
    <div className={`relative flex flex-col w-full max-w-2xl min-w-[200px] ${className}`}>
      {/* Input Shell */}
      <div
        className={`flex items-center w-full border rounded-lg overflow-hidden transition-all duration-200 z-20 ${stateStyles} ${
          compactMode ? "h-8 px-2" : "h-10 px-3"
        } ${showDropdown ? "rounded-b-none border-b-transparent ring-0" : ""}`}
      >
        <div
          className={`shrink-0 flex items-center justify-center ${compactMode ? "w-4 h-4 mr-1.5" : "w-5 h-5 mr-2"} ${iconColor}`}
        >
          {state === "loading" ? (
            <Icon name="Loader" className="animate-spin w-full h-full" />
          ) : (
            leadingIconSlot || <Icon name="Search" className="w-full h-full" />
          )}
        </div>

        <div className="flex-1 h-full min-w-0">
          {inputSlot || (
            <input
              type="text"
              placeholder="Search or type a command..."
              disabled={state === "disabled" || state === "loading"}
              className={`w-full h-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 ${
                compactMode ? "text-xs" : "text-sm"
              }`}
            />
          )}
        </div>

        {trailingActionsSlot && (
          <div className={`shrink-0 flex items-center ml-2 ${compactMode ? "gap-1" : "gap-2"}`}>
            {trailingActionsSlot}
          </div>
        )}
      </div>

      {/* Dropdown Shell */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-lg shadow-xl z-50 overflow-hidden flex flex-col max-h-[400px]">
          {/* We only render these structural slots if they are provided, else we fallback to empty if nothing at all is given. */}
          {resultsSlot && <div className="flex-1 overflow-y-auto">{resultsSlot}</div>}

          {!resultsSlot && suggestionsSlot && (
            <div className="flex-1 overflow-y-auto bg-gray-50 p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Suggestions
              </div>
              {suggestionsSlot}
            </div>
          )}

          {!resultsSlot && !suggestionsSlot && emptySlot && (
            <div className="p-4 flex flex-col items-center justify-center text-center text-gray-500">
              {emptySlot}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ComponentRegistry.register({
  id: "command-bar",
  name: "CommandBar",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
