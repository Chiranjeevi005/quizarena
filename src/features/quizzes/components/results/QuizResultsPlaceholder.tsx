import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsPlaceholder: React.FC<QuizResultsPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-placeholder",
      name: "QuizResultsPlaceholder",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
