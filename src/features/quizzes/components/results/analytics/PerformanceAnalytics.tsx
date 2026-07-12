import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PerformanceAnalyticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "performance-analytics",
      name: "PerformanceAnalytics",
      category: "quiz",
      subtype: "analytics-chart",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
