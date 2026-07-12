import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerBody: React.FC<QuestionPlayerBodyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-body",
      name: "QuestionPlayerBody",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
