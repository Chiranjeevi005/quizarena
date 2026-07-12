import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionBreakdownProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionBreakdown: React.FC<QuestionBreakdownProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-breakdown",
      name: "QuestionBreakdown",
      category: "quiz",
      subtype: "analytics-breakdown",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
