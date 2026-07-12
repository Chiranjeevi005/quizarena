import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsEmpty: React.FC<QuizResultsEmptyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-empty",
      name: "QuizResultsEmpty",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
