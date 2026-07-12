import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionContentRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionContentRenderer: React.FC<QuestionContentRendererProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-content-renderer",
      name: "QuestionContentRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
