import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionProgressIndicatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionProgressIndicator: React.FC<QuestionProgressIndicatorProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-progress-indicator",
      name: "QuestionProgressIndicator",
      category: "quiz",
      subtype: "player-navigation",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
