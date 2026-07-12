import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionCompletedProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionCompleted: React.FC<SessionCompletedProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-completed",
      name: "SessionCompleted",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
