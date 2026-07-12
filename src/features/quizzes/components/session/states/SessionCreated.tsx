import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionCreatedProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionCreated: React.FC<SessionCreatedProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-created",
      name: "SessionCreated",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
