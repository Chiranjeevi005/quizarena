import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ComparisonAnalyticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComparisonAnalytics: React.FC<ComparisonAnalyticsProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "comparison-analytics",
      name: "ComparisonAnalytics",
      category: "quiz",
      subtype: "analytics-chart",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
