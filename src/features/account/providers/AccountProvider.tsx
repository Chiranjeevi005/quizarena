"use client";
import React, { createContext, useContext } from "react";
import { useAuth } from "@/features/identity";

export const AccountContext = createContext<any>(null);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  return <AccountContext.Provider value={{ auth }}>{children}</AccountContext.Provider>;
};

export const useAccount = () => useContext(AccountContext);
