"use client";
import React from "react";
import { ReviewRegion, TimerRegion } from "../regions";
import { DeliverySplitLayout } from "../layout";

export function ReviewStage({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <DeliverySplitLayout
        topSlot={
          <TimerRegion>
            <div className="text-sm font-medium">Review Mode Timer</div>
          </TimerRegion>
        }
        canvasSlot={
          <ReviewRegion>
            <div className="p-12 text-center text-gray-400">Review Platform Placeholder</div>
          </ReviewRegion>
        }
      />
    </div>
  );
}
