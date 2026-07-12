"use client";
import React from "react";

// Optional boundary for error catching at the composition layer
export function DeliveryBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
