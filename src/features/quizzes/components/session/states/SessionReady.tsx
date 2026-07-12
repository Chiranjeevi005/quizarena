import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionReadyProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionReady: React.FC<SessionReadyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-ready",
      name: "SessionReady",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
