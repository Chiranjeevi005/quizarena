import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerFooterBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerFooterBar: React.FC<PlayerFooterBarProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-footer-bar",
      name: "PlayerFooterBar",
      category: "quiz",
      subtype: "player-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
