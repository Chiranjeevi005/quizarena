"use client";

import React, { createContext, useContext, useState } from "react";
import { ProviderRegistry } from "@/registry";

interface WorkspaceContextType {
  workspaceId: string | null;
  setWorkspaceId: (id: string | null) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  return (
    <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
}

ProviderRegistry.register({
  id: "workspace-provider",
  name: "WorkspaceProvider",
  description: "Global provider for active workspace context.",
});
