"use client";
import React from "react";
import { ResultsRegion } from "../regions";
import { DeliveryFocusedLayout } from "../layout";

export function ResultsStage({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <DeliveryFocusedLayout
        canvasSlot={
          <ResultsRegion>
            <div className="p-12 text-center text-gray-400">Results Platform Placeholder</div>
          </ResultsRegion>
        }
      />
    </div>
  );
}
