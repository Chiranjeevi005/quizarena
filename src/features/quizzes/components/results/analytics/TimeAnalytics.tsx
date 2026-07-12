import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface TimeAnalyticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const TimeAnalytics: React.FC<TimeAnalyticsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "time-analytics",
      name: "TimeAnalytics",
      category: "quiz",
      subtype: "analytics-chart",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
