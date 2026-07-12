import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionWorkspaceProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionWorkspace: React.FC<SessionWorkspaceProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-workspace",
      name: "SessionWorkspace",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
