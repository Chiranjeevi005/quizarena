import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerErrorProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerError: React.FC<QuestionPlayerErrorProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-error",
      name: "QuestionPlayerError",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
