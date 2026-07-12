import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsErrorProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsError: React.FC<QuizResultsErrorProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-error",
      name: "QuizResultsError",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
