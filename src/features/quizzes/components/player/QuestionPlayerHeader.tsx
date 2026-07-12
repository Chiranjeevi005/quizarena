import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerHeader: React.FC<QuestionPlayerHeaderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-header",
      name: "QuestionPlayerHeader",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
