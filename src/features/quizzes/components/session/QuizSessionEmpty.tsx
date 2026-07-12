import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionEmpty: React.FC<QuizSessionEmptyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-empty",
      name: "QuizSessionEmpty",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
