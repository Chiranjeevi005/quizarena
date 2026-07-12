import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface WeaknessPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const WeaknessPanel: React.FC<WeaknessPanelProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "weakness-panel",
      name: "WeaknessPanel",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
