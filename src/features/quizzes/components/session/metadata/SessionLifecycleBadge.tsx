import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionLifecycleBadgeProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionLifecycleBadge: React.FC<SessionLifecycleBadgeProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-lifecycle-badge",
      name: "SessionLifecycleBadge",
      category: "quiz",
      subtype: "session-metadata",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
