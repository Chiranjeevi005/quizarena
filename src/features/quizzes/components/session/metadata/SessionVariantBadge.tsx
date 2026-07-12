import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionVariantBadgeProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionVariantBadge: React.FC<SessionVariantBadgeProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-variant-badge",
      name: "SessionVariantBadge",
      category: "quiz",
      subtype: "session-metadata",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
