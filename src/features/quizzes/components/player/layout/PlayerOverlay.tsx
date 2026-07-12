import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerOverlayProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerOverlay: React.FC<PlayerOverlayProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-overlay",
      name: "PlayerOverlay",
      category: "quiz",
      subtype: "player-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
