import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizBuilderToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizBuilderToolbar: React.FC<QuizBuilderToolbarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-builder-toolbar",
      name: "QuizBuilderToolbar",
      category: "quiz",
      subtype: "builder",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
