import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionReadinessPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionReadinessPanel: React.FC<SessionReadinessPanelProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "readiness-panel",
      name: "SessionReadinessPanel",
      category: "quiz",
      subtype: "session-completion",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
