"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProviderRegistry } from "@/registry";

type ResponsiveState = "desktop" | "tablet" | "mobile";

interface LayoutContextType {
  // Mobile drawer state
  isMobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
  toggleMobileDrawer: () => void;

  // Desktop sidebar state
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // Responsive state
  responsiveState: ResponsiveState;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setResponsiveState("mobile");
        // Auto-close drawer on mobile when resizing from larger screens
        if (responsiveState !== "mobile") {
          setMobileDrawerOpen(false);
        }
      } else if (width >= 768 && width < 1024) {
        setResponsiveState("tablet");
        // Force collapse on tablet
        setSidebarCollapsed(true);
        setMobileDrawerOpen(false);
      } else {
        setResponsiveState("desktop");
        // Un-collapse on large desktop
        setSidebarCollapsed(false);
        setMobileDrawerOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsiveState]);

  const toggleMobileDrawer = () => setMobileDrawerOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <LayoutContext.Provider
      value={{
        isMobileDrawerOpen,
        setMobileDrawerOpen,
        toggleMobileDrawer,
        isSidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        responsiveState,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider");
  return context;
}

ProviderRegistry.register({
  id: "layout-provider",
  name: "LayoutProvider",
  description: "Global provider for Application Layout state (Sidebar, Drawer, Responsiveness).",
});
