"use client";
import React from "react";

export function QuizTimerLoading({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border border-gray-200 ${className}`}
    >
      <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <div className="text-gray-500 font-medium">Loading session state...</div>
    </div>
  );
}
