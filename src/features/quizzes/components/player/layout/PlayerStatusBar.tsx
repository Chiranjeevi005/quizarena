import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerStatusBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerStatusBar: React.FC<PlayerStatusBarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-status-bar",
      name: "PlayerStatusBar",
      category: "quiz",
      subtype: "player-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
