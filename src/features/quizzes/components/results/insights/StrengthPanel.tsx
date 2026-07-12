import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface StrengthPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const StrengthPanel: React.FC<StrengthPanelProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "strength-panel",
      name: "StrengthPanel",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
