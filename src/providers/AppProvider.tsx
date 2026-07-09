"use client";

import React from "react";
import { ThemeProvider } from "@/theme";
import { ToastProvider } from "./ToastProvider";
import { DialogProvider } from "./DialogProvider";
import { DrawerProvider } from "./DrawerProvider";
import { CommandPaletteProvider } from "./CommandPaletteProvider";
import { LayoutProvider } from "./LayoutProvider";
import { WorkspaceProvider } from "./WorkspaceProvider";
import { LoadingProvider } from "@/components/loading";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <WorkspaceProvider>
          <LayoutProvider>
            <ToastProvider>
              <DialogProvider>
                <DrawerProvider>
                  <CommandPaletteProvider>{children}</CommandPaletteProvider>
                </DrawerProvider>
              </DialogProvider>
            </ToastProvider>
          </LayoutProvider>
        </WorkspaceProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
