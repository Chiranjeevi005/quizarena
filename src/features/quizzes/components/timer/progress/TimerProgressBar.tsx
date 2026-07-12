"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function TimerProgressBar({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  let bgClass = "bg-indigo-600";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING) bgClass = "bg-amber-500";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL) bgClass = "bg-red-600";

  return (
    <div
      className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={time.percentageComplete}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full transition-all duration-500 ease-in-out ${bgClass}`}
        style={{ width: `${Math.min(Math.max(time.percentageComplete, 0), 100)}%` }}
      />
    </div>
  );
}
