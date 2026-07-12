"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProviderRegistry } from "@/registry";
import { ToolbarOrientation } from "@/toolbar/ToolbarTypes";

export interface ToolbarState {
  visibleGroups: string[]; // IDs of visible groups
  setVisibleGroups: (groups: string[]) => void;

  compactMode: boolean;
  setCompactMode: (compact: boolean) => void;

  overflowVisible: boolean;
  setOverflowVisible: (visible: boolean) => void;

  orientation: ToolbarOrientation;
  setOrientation: (orientation: ToolbarOrientation) => void;
}

const ToolbarContext = createContext<ToolbarState | undefined>(undefined);

export function ToolbarProvider({
  children,
  defaultVisibleGroups = [],
  defaultCompactMode = false,
  defaultOrientation = "horizontal",
}: {
  children: ReactNode;
  defaultVisibleGroups?: string[];
  defaultCompactMode?: boolean;
  defaultOrientation?: ToolbarOrientation;
}) {
  const [visibleGroups, setVisibleGroups] = useState<string[]>(defaultVisibleGroups);
  const [compactMode, setCompactMode] = useState<boolean>(defaultCompactMode);
  const [overflowVisible, setOverflowVisible] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<ToolbarOrientation>(defaultOrientation);

  return (
    <ToolbarContext.Provider
      value={{
        visibleGroups,
        setVisibleGroups,
        compactMode,
        setCompactMode,
        overflowVisible,
        setOverflowVisible,
        orientation,
        setOrientation,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}

export function useToolbar() {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
}

ProviderRegistry.register({
  id: "toolbar-provider",
  name: "ToolbarProvider",
  description: "Provides granular presentation state for the Enterprise Toolbar Platform",
});
