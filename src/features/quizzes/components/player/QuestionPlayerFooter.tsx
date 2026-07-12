import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerFooter: React.FC<QuestionPlayerFooterProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-footer",
      name: "QuestionPlayerFooter",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
