"use client";
import React from "react";

export function DeliveryStatusBar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full bg-indigo-600 text-white px-4 py-2 flex items-center justify-between text-sm font-medium shadow z-20 ${className}`}
    >
      {children}
    </div>
  );
}
