import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionToolbar: React.FC<QuizSessionToolbarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-toolbar",
      name: "QuizSessionToolbar",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
