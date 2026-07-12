import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSummarySectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSummarySection: React.FC<QuizSummarySectionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-summary-section",
      name: "QuizSummarySection",
      category: "quiz",
      subtype: "builder-section",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
