import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerStatusProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerStatus: React.FC<QuestionPlayerStatusProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-status",
      name: "QuestionPlayerStatus",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
