import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionStatusBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionStatusBar: React.FC<SessionStatusBarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-status-bar",
      name: "SessionStatusBar",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
