"use client";
import React from "react";
import {
  SessionRegion,
  PlayerRegion,
  NavigationRegion,
  TimerRegion,
  StatusRegion,
} from "../regions";
import { DeliverySplitLayout } from "../layout";

export function ActiveStage({ className = "" }: { className?: string }) {
  // ActiveStage directly composes the split layout and regions
  return (
    <div className={`w-full h-full ${className}`}>
      <DeliverySplitLayout
        topSlot={
          <TimerRegion>
            <StatusRegion />
          </TimerRegion>
        }
        sidebarSlot={
          <NavigationRegion>
            <div className="p-4 text-gray-400">Navigation Content Placeholder</div>
          </NavigationRegion>
        }
        canvasSlot={
          <SessionRegion>
            <PlayerRegion>
              <div className="p-12 text-center text-gray-400">Question Player Placeholder</div>
            </PlayerRegion>
          </SessionRegion>
        }
      />
    </div>
  );
}
