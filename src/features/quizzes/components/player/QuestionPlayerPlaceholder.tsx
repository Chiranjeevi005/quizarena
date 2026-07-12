import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerPlaceholder: React.FC<QuestionPlayerPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-placeholder",
      name: "QuestionPlayerPlaceholder",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
