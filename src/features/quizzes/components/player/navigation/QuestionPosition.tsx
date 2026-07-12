import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPositionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPosition: React.FC<QuestionPositionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-position",
      name: "QuestionPosition",
      category: "quiz",
      subtype: "player-navigation",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
