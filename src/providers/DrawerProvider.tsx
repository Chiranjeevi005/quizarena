"use client";

import React, { createContext, useContext, useState } from "react";
import { ProviderRegistry } from "@/registry";

interface DrawerContextType {
  openDrawer: (content: React.ReactNode) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openDrawer = (newContent: React.ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      {/* Drawer Primitive UI goes here */}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer must be used within DrawerProvider");
  return context;
}

ProviderRegistry.register({
  id: "drawer-provider",
  name: "DrawerProvider",
  description: "Global provider for Drawers.",
});
