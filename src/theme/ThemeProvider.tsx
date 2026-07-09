"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ColorMode } from "@/types";

interface ThemeContextValue {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultMode = "system",
}: {
  children: ReactNode;
  defaultMode?: ColorMode;
}) {
  const [colorMode, setColorMode] = React.useState<ColorMode>(defaultMode);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
