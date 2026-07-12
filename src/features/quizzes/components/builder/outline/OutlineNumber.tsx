import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface OutlineNumberProps {
  children?: React.ReactNode;
  className?: string;
}

export const OutlineNumber: React.FC<OutlineNumberProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "outline-number",
      name: "OutlineNumber",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
