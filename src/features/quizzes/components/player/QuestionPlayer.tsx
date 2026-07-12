import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayer: React.FC<QuestionPlayerProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player",
      name: "QuestionPlayer",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
