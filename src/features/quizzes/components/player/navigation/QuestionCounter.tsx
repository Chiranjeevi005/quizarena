import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionCounterProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionCounter: React.FC<QuestionCounterProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-counter",
      name: "QuestionCounter",
      category: "quiz",
      subtype: "player-navigation",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
