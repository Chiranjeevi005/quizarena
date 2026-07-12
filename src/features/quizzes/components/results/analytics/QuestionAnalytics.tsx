import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionAnalyticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionAnalytics: React.FC<QuestionAnalyticsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-analytics",
      name: "QuestionAnalytics",
      category: "quiz",
      subtype: "analytics-chart",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
