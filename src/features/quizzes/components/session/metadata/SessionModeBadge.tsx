import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionModeBadgeProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionModeBadge: React.FC<SessionModeBadgeProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-mode-badge",
      name: "SessionModeBadge",
      category: "quiz",
      subtype: "session-metadata",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
