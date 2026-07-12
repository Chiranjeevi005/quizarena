import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerSidebar: React.FC<PlayerSidebarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-sidebar",
      name: "PlayerSidebar",
      category: "quiz",
      subtype: "player-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
