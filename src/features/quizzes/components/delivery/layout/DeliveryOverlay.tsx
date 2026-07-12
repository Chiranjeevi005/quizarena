"use client";
import React from "react";

export function DeliveryOverlay({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-40 flex items-center justify-center ${className}`}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
