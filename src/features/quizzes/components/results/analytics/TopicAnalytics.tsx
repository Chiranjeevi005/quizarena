import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface TopicAnalyticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const TopicAnalytics: React.FC<TopicAnalyticsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "topic-analytics",
      name: "TopicAnalytics",
      category: "quiz",
      subtype: "analytics-chart",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
