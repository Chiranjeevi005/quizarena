import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-header",
      name: "QuestionHeader",
      category: "quiz",
      subtype: "player-navigation",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
