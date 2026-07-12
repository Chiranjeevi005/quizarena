"use client";
import React from "react";

export function EmbeddedTimerRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full bg-white border-b border-gray-200 sticky top-0 z-40 ${className}`}>
      {children}
    </div>
  );
}
