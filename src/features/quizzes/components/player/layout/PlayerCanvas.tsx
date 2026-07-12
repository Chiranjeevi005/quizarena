import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerCanvasProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerCanvas: React.FC<PlayerCanvasProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-canvas",
      name: "PlayerCanvas",
      category: "quiz",
      subtype: "player-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
