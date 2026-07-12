import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionQuestionCounterProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionQuestionCounter: React.FC<SessionQuestionCounterProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-question-counter",
      name: "SessionQuestionCounter",
      category: "quiz",
      subtype: "session-metadata",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
