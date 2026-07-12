import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionMathRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionMathRenderer: React.FC<QuestionMathRendererProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-math-renderer",
      name: "QuestionMathRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
