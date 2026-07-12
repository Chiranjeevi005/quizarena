import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionSidebar: React.FC<SessionSidebarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-sidebar",
      name: "SessionSidebar",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
