import React, { ReactNode } from "react";

export interface ActionBarProps {
  leading?: ReactNode;
  center?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}
