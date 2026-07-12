import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface FooterRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const FooterRegion: React.FC<FooterRegionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "footer-region",
      name: "FooterRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
