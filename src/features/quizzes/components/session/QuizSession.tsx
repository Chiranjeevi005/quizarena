import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSession: React.FC<QuizSessionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session",
      name: "QuizSession",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
