"use client";
import React from "react";

export function FullscreenTimerRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
