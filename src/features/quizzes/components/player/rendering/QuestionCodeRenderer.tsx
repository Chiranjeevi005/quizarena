import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionCodeRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionCodeRenderer: React.FC<QuestionCodeRendererProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-code-renderer",
      name: "QuestionCodeRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
