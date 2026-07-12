import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionNavigationFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionNavigationFooter: React.FC<QuestionNavigationFooterProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-navigation-footer",
      name: "QuestionNavigationFooter",
      category: "quiz",
      subtype: "player-navigation",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
