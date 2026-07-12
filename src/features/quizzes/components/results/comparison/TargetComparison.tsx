import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface TargetComparisonProps {
  children?: React.ReactNode;
  className?: string;
}

export const TargetComparison: React.FC<TargetComparisonProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "target-comparison",
      name: "TargetComparison",
      category: "quiz",
      subtype: "analytics-comparison",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
