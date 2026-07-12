import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizOutlineProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizOutline: React.FC<QuizOutlineProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-outline",
      name: "QuizOutline",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
