import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface OutlinePlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const OutlinePlaceholder: React.FC<OutlinePlaceholderProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "outline-placeholder",
      name: "OutlinePlaceholder",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
