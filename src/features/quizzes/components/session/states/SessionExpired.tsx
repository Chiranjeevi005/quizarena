import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionExpiredProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionExpired: React.FC<SessionExpiredProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-expired",
      name: "SessionExpired",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
