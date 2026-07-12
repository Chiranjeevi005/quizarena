"use client";
import React from "react";
import { DeliveryWorkspace } from "./DeliveryWorkspace";
import { DeliveryViewport } from "./DeliveryViewport";
import { DeliverySidebar } from "./DeliverySidebar";
import { DeliveryCanvas } from "./DeliveryCanvas";
import { DeliveryStatusBar } from "./DeliveryStatusBar";
import { DeliveryFooterBar } from "./DeliveryFooterBar";

interface DeliverySplitLayoutProps {
  topSlot?: React.ReactNode;
  sidebarSlot?: React.ReactNode;
  canvasSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
}

export function DeliverySplitLayout({
  topSlot,
  sidebarSlot,
  canvasSlot,
  footerSlot,
}: DeliverySplitLayoutProps) {
  return (
    <DeliveryWorkspace>
      <DeliverySidebar>{sidebarSlot}</DeliverySidebar>
      <DeliveryViewport>
        {topSlot && <DeliveryStatusBar>{topSlot}</DeliveryStatusBar>}
        <DeliveryCanvas>{canvasSlot}</DeliveryCanvas>
        {footerSlot && <DeliveryFooterBar>{footerSlot}</DeliveryFooterBar>}
      </DeliveryViewport>
    </DeliveryWorkspace>
  );
}
