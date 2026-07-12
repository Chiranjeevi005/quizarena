"use client";
import React from "react";

export function FlaggedIndicator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 ${className}`}
    >
      <span>🚩</span>
      Flagged
    </div>
  );
}
