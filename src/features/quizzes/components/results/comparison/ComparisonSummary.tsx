import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ComparisonSummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "comparison-summary",
      name: "ComparisonSummary",
      category: "quiz",
      subtype: "analytics-comparison",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
