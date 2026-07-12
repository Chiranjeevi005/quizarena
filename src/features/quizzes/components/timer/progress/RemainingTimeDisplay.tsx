"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function RemainingTimeDisplay({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  let textClass = "text-gray-900";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING) textClass = "text-amber-700";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL) textClass = "text-red-700 font-bold";

  return (
    <div className={`text-sm text-gray-600 flex items-center gap-1.5 ${className}`}>
      <span className={textClass}>{time.displayTime}</span> remaining
    </div>
  );
}
