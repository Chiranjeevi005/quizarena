import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionBody: React.FC<QuizSessionBodyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-body",
      name: "QuizSessionBody",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
