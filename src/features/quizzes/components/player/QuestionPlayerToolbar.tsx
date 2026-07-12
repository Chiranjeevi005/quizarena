import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerToolbar: React.FC<QuestionPlayerToolbarProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-toolbar",
      name: "QuestionPlayerToolbar",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
