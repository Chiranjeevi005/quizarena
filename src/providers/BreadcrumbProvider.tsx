"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProviderRegistry } from "@/registry";
import { IconName } from "@/icons/IconRegistry";

export interface BreadcrumbNode {
  id: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
  hidden?: boolean;
  truncated?: boolean;
}

export interface BreadcrumbState {
  visibleItems: BreadcrumbNode[];
  collapsedItems: BreadcrumbNode[];
  currentItem?: BreadcrumbNode;
  compactMode: boolean;
  setVisibleItems: (items: BreadcrumbNode[]) => void;
  setCollapsedItems: (items: BreadcrumbNode[]) => void;
  setCurrentItem: (item?: BreadcrumbNode) => void;
  setCompactMode: (compact: boolean) => void;
}

const BreadcrumbContext = createContext<BreadcrumbState | undefined>(undefined);

export function BreadcrumbProvider({
  children,
  defaultVisibleItems = [],
  defaultCollapsedItems = [],
  defaultCurrentItem,
  defaultCompactMode = false,
}: {
  children: ReactNode;
  defaultVisibleItems?: BreadcrumbNode[];
  defaultCollapsedItems?: BreadcrumbNode[];
  defaultCurrentItem?: BreadcrumbNode;
  defaultCompactMode?: boolean;
}) {
  const [visibleItems, setVisibleItems] = useState<BreadcrumbNode[]>(defaultVisibleItems);
  const [collapsedItems, setCollapsedItems] = useState<BreadcrumbNode[]>(defaultCollapsedItems);
  const [currentItem, setCurrentItem] = useState<BreadcrumbNode | undefined>(defaultCurrentItem);
  const [compactMode, setCompactMode] = useState<boolean>(defaultCompactMode);

  return (
    <BreadcrumbContext.Provider
      value={{
        visibleItems,
        collapsedItems,
        currentItem,
        compactMode,
        setVisibleItems,
        setCollapsedItems,
        setCurrentItem,
        setCompactMode,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
}

ProviderRegistry.register({
  id: "breadcrumb-provider",
  name: "BreadcrumbProvider",
  description: "Provides granular context state for the Enterprise Breadcrumb Platform",
});
