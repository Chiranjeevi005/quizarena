import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionOrderingSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionOrderingSection: React.FC<QuestionOrderingSectionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-ordering-section",
      name: "QuestionOrderingSection",
      category: "quiz",
      subtype: "builder-section",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
