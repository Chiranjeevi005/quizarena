import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionMediaRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionMediaRenderer: React.FC<QuestionMediaRendererProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-media-renderer",
      name: "QuestionMediaRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
