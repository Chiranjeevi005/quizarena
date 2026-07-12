import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionActiveProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionActive: React.FC<SessionActiveProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-active",
      name: "SessionActive",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
