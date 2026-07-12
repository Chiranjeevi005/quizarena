"use client";
import React from "react";

export function DeliveryFloatingRegions({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute bottom-6 right-6 z-30 flex flex-col gap-4 pointer-events-none ${className}`}
    >
      <div className="pointer-events-auto shadow-lg rounded-xl overflow-hidden">{children}</div>
    </div>
  );
}
