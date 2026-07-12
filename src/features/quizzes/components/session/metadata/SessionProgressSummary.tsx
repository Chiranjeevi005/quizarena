import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionProgressSummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionProgressSummary: React.FC<SessionProgressSummaryProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-progress-summary",
      name: "SessionProgressSummary",
      category: "quiz",
      subtype: "session-metadata",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
