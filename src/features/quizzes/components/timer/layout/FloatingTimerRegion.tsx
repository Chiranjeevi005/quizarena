"use client";
import React from "react";

export function FloatingTimerRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`fixed bottom-6 right-6 z-50 ${className}`}>{children}</div>;
}
