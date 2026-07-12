import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionCompletionSummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionCompletionSummary: React.FC<SessionCompletionSummaryProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "completion-summary",
      name: "SessionCompletionSummary",
      category: "quiz",
      subtype: "session-completion",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
