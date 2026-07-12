"use client";
import React from "react";

export function QuizTimerError({
  className = "",
  message = "Failed to load timer",
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-red-50 p-6 rounded-xl border border-red-200 text-red-700 ${className}`}
    >
      <div className="text-2xl mb-2">⚠️</div>
      <div className="font-semibold">{message}</div>
    </div>
  );
}
