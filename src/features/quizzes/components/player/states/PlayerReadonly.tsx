import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerReadonlyProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerReadonly: React.FC<PlayerReadonlyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-readonly",
      name: "PlayerReadonly",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
