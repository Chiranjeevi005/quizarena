import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionSubmittingProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionSubmitting: React.FC<SessionSubmittingProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-submitting",
      name: "SessionSubmitting",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
