import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionCanvasProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionCanvas: React.FC<SessionCanvasProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-canvas",
      name: "SessionCanvas",
      category: "quiz",
      subtype: "session-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
