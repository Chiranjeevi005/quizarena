import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsDashboardProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-dashboard",
      name: "ResultsDashboard",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
