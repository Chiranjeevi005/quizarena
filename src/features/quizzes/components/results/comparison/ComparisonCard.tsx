import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ComparisonCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "comparison-card",
      name: "ComparisonCard",
      category: "quiz",
      subtype: "analytics-comparison",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
