import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionWarningPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionWarningPanel: React.FC<SessionWarningPanelProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "warning-panel",
      name: "SessionWarningPanel",
      category: "quiz",
      subtype: "session-completion",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
