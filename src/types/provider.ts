import { ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
}

export interface GlobalProviderConfig {
  enableToasts?: boolean;
  enableDialogs?: boolean;
  enableDrawers?: boolean;
  enableCommandPalette?: boolean;
}
