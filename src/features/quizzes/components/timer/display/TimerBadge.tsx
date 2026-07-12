"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function TimerBadge({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  let dotClass = "bg-green-500";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING) dotClass = "bg-amber-500";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL) dotClass = "bg-red-500 animate-ping";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 ${className}`}
      role="timer"
      aria-live="off"
    >
      <div className={`w-2 h-2 rounded-full ${dotClass}`} />
      {time.displayTime}
    </div>
  );
}
