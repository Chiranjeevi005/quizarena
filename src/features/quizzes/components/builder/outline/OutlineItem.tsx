import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface OutlineItemProps {
  children?: React.ReactNode;
  className?: string;
}

export const OutlineItem: React.FC<OutlineItemProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "outline-item",
      name: "OutlineItem",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
