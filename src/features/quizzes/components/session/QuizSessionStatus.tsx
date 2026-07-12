import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionStatusProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionStatus: React.FC<QuizSessionStatusProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-status",
      name: "QuizSessionStatus",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
