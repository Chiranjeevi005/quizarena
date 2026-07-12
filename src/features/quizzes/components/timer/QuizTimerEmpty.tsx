"use client";
import React from "react";

export function QuizTimerEmpty({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 ${className}`}
    >
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-gray-400">🕒</span>
      </div>
      <div className="text-gray-500 font-medium">No active timer</div>
    </div>
  );
}
