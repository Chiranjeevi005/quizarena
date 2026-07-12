import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionErrorProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionError: React.FC<QuizSessionErrorProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-error",
      name: "QuizSessionError",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
