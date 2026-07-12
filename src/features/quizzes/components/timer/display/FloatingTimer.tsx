"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function FloatingTimer({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  let bgClass = "bg-white border-gray-200 text-gray-900";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING)
    bgClass = "bg-amber-50 border-amber-200 text-amber-700";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL)
    bgClass = "bg-red-50 border-red-200 text-red-700 animate-bounce";

  return (
    <div
      className={`fixed bottom-6 right-6 shadow-xl border rounded-full px-6 py-3 flex items-center gap-3 font-mono font-bold text-xl z-50 ${bgClass} ${className}`}
      role="timer"
      aria-live="off"
    >
      <span className="text-2xl">⏳</span>
      {time.displayTime}
    </div>
  );
}
