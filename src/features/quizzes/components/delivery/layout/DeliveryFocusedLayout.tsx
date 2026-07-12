"use client";
import React from "react";
import { DeliveryWorkspace } from "./DeliveryWorkspace";
import { DeliveryViewport } from "./DeliveryViewport";
import { DeliveryCanvas } from "./DeliveryCanvas";
import { DeliveryStatusBar } from "./DeliveryStatusBar";
import { DeliveryFloatingRegions } from "./DeliveryFloatingRegions";

interface DeliveryFocusedLayoutProps {
  topSlot?: React.ReactNode;
  canvasSlot?: React.ReactNode;
  floatingSlot?: React.ReactNode;
}

export function DeliveryFocusedLayout({
  topSlot,
  canvasSlot,
  floatingSlot,
}: DeliveryFocusedLayoutProps) {
  return (
    <DeliveryWorkspace>
      <DeliveryViewport>
        {topSlot && <DeliveryStatusBar>{topSlot}</DeliveryStatusBar>}
        <DeliveryCanvas className="px-12 py-8">{canvasSlot}</DeliveryCanvas>
        {floatingSlot && <DeliveryFloatingRegions>{floatingSlot}</DeliveryFloatingRegions>}
      </DeliveryViewport>
    </DeliveryWorkspace>
  );
}
