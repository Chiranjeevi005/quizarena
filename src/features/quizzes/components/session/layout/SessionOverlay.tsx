import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionOverlayProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionOverlay: React.FC<SessionOverlayProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-overlay",
      name: "SessionOverlay",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
