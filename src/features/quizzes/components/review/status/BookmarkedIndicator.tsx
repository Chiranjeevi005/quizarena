"use client";
import React from "react";

export function BookmarkedIndicator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 ${className}`}
    >
      <span>🔖</span>
      Bookmarked
    </div>
  );
}
