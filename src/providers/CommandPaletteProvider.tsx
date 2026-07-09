"use client";

import React, { createContext, useContext, useState } from "react";
import { ProviderRegistry } from "@/registry";

interface CommandPaletteContextType {
  openPalette: () => void;
  closePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);

  return (
    <CommandPaletteContext.Provider value={{ openPalette, closePalette }}>
      {children}
      {/* Command Palette UI goes here */}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return context;
}

ProviderRegistry.register({
  id: "command-palette-provider",
  name: "CommandPaletteProvider",
  description: "Global provider for the Command Palette.",
});
