"use client";

import React from "react";
import { ToolbarActionProps } from "./ToolbarAction.types";
import { ComponentRegistry } from "@/registry";
import { Icon } from "@/icons/Icon";
import { useToolbar } from "@/providers/ToolbarProvider";

export function ToolbarAction({
  id,
  icon,
  label,
  active,
  selected,
  disabled,
  loading,
  badge,
  counter,
  favorite,
  danger,
  onClick,
  className = "",
}: ToolbarActionProps) {
  const { compactMode } = useToolbar();

  const isTextOnly = !icon && !!label;
  const isIconOnly = !!icon && !label;

  let baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-colors shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";

  if (compactMode) {
    baseStyles += " rounded-md text-xs " + (isIconOnly ? "w-7 h-7" : "px-2 py-1 gap-1.5");
  } else {
    baseStyles += " rounded-lg text-sm " + (isIconOnly ? "w-9 h-9" : "px-3 py-1.5 gap-2");
  }

  let colorStyles = "text-secondary hover:text-primary hover:bg-gray-100";
  if (disabled || loading) {
    colorStyles = "text-gray-400 opacity-60 cursor-not-allowed";
  } else if (active || selected) {
    colorStyles = "bg-primary/10 text-primary";
  } else if (danger) {
    colorStyles = "text-red-600 hover:bg-red-50";
  } else if (favorite) {
    colorStyles = "text-yellow-500 hover:bg-yellow-50";
  }

  return (
    <button
      type="button"
      id={id}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={label}
      aria-disabled={disabled || loading}
      aria-pressed={active || selected}
      className={`${baseStyles} ${colorStyles} ${className}`}
    >
      {loading ? (
        <span
          className={`animate-spin rounded-full border-2 border-current border-t-transparent ${compactMode ? "w-3.5 h-3.5" : "w-4 h-4"}`}
        />
      ) : (
        <>
          {icon && (
            <Icon name={icon} className={`${compactMode ? "w-4 h-4" : "w-5 h-5"} shrink-0`} />
          )}
          {label && <span>{label}</span>}
        </>
      )}

      {/* Badge Indicator */}
      {badge && !loading && (
        <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-red-500 rounded-full">
          {badge}
        </span>
      )}

      {/* Counter */}
      {counter !== undefined && !loading && (
        <span
          className={`ml-1 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold ${compactMode ? "h-4 px-1.5 text-[9px]" : "h-5 px-2 text-[10px]"}`}
        >
          {counter}
        </span>
      )}
    </button>
  );
}

ComponentRegistry.register({
  id: "toolbar-action",
  name: "ToolbarAction",
  category: "toolbar" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
