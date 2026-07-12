import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionPausedProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionPaused: React.FC<SessionPausedProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-paused",
      name: "SessionPaused",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
