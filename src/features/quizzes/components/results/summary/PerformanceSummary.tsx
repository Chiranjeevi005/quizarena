import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PerformanceSummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "performance-summary",
      name: "PerformanceSummary",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
