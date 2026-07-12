import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionFooterBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionFooterBar: React.FC<SessionFooterBarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-footer-bar",
      name: "SessionFooterBar",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
