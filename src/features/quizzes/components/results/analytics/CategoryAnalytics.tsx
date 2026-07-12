import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface CategoryAnalyticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const CategoryAnalytics: React.FC<CategoryAnalyticsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "category-analytics",
      name: "CategoryAnalytics",
      category: "quiz",
      subtype: "analytics-chart",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
