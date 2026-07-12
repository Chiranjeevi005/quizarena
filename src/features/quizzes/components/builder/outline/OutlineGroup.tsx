import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface OutlineGroupProps {
  children?: React.ReactNode;
  className?: string;
}

export const OutlineGroup: React.FC<OutlineGroupProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "outline-group",
      name: "OutlineGroup",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
