import React, { createContext, useContext, ReactNode } from "react";

export interface IdentityContextState {
  isInitialized: boolean;
  tenantId: string | null;
  activeWorkspaceId: string | null;
  // Future: membership details, resolved permission snapshot
}

const defaultContext: IdentityContextState = {
  isInitialized: false,
  tenantId: null,
  activeWorkspaceId: null,
};

const IdentityContext = createContext<IdentityContextState>(defaultContext);

export const IdentityProvider = ({ children }: { children: ReactNode }) => {
  return <IdentityContext.Provider value={defaultContext}>{children}</IdentityContext.Provider>;
};

export const useIdentity = () => useContext(IdentityContext);
