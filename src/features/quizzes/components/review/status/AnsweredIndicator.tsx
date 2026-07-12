"use client";
import React from "react";

export function AnsweredIndicator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
      Answered
    </div>
  );
}
