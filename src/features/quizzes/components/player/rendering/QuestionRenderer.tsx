import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-renderer",
      name: "QuestionRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
