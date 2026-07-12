"use client";
import React from "react";

export function VisitedIndicator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
      Visited
    </div>
  );
}
