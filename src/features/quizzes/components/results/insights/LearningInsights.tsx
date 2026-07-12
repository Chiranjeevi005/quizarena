import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface LearningInsightsProps {
  children?: React.ReactNode;
  className?: string;
}

export const LearningInsights: React.FC<LearningInsightsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "learning-insights",
      name: "LearningInsights",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
