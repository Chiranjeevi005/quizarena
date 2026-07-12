import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsSidebar: React.FC<ResultsSidebarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-sidebar",
      name: "ResultsSidebar",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
