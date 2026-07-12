import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface MilestonePlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const MilestonePlaceholder: React.FC<MilestonePlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "milestone-placeholder",
      name: "MilestonePlaceholder",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
