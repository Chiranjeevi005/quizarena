import React, { createContext, useContext } from "react";

interface ThemeTokens {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

interface ThemeContextType {
  mode: "light" | "dark";
  tokens: ThemeTokens;
}

const lightTokens: ThemeTokens = {
  colors: {
    primary: "#3b82f6", // blue-500
    background: "#000000",
    surface: "#111827", // gray-900
    text: "#f3f4f6", // gray-100
    textMuted: "#9ca3af", // gray-400
    border: "#374151", // gray-700
    error: "#ef4444",
    success: "#10b981",
    warning: "#f59e0b",
  },
};

const defaultContext: ThemeContextType = {
  mode: "dark", // Using dark as MVP per current styling
  tokens: lightTokens,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
