"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { DashboardState, AdminUser } from "../types/admin.types";

interface AdminContextType {
  user: AdminUser | null;
  state: DashboardState;
  permissions: string[];
  capabilities: string[];
  workspace: string;
  environment: string;
  tenant: string;
  version: string;
  setState: (state: DashboardState) => void;
}

const defaultContext: AdminContextType = {
  user: null,
  state: DashboardState.INITIALIZING,
  permissions: [
    "view:dashboard",
    "view:competitions",
    "view:people",
    "view:finance",
    "view:operations",
    "view:settings",
    "view:help",
  ],
  capabilities: [],
  workspace: "default",
  environment: "production",
  tenant: "quizarena",
  version: "1.0.0",
  setState: () => {},
};

const AdminContext = createContext<AdminContextType>(defaultContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DashboardState>(DashboardState.INITIALIZING);

  // Mock initialization
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(DashboardState.READY);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        ...defaultContext,
        state,
        setState,
        user: {
          id: "1",
          name: "Super Admin",
          email: "admin@quizarena.com",
          role: "SUPER_ADMIN",
          permissions: defaultContext.permissions,
        },
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
