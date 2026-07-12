import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionViewportProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionViewport: React.FC<SessionViewportProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-viewport",
      name: "SessionViewport",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
