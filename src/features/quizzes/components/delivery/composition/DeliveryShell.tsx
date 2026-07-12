"use client";
import React from "react";
import { WorkspaceComposer } from "./WorkspaceComposer";

export function DeliveryShell({ className = "" }: { className?: string }) {
  // Can be extended to include global error boundaries, providers, or layout shells
  return (
    <div className={`w-full h-full bg-gray-50 ${className}`}>
      <WorkspaceComposer />
    </div>
  );
}
