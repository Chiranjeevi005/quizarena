import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface CategoryBreakdownProps {
  children?: React.ReactNode;
  className?: string;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "category-breakdown",
      name: "CategoryBreakdown",
      category: "quiz",
      subtype: "analytics-breakdown",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
