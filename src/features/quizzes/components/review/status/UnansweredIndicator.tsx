"use client";
import React from "react";

export function UnansweredIndicator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
      Unanswered
    </div>
  );
}
