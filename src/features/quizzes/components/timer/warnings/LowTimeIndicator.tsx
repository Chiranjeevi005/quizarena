"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function LowTimeIndicator({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  if (time.warningLevel !== QuizTimerWarningLevel.WARNING) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-800 animate-pulse ${className}`}
    >
      <span>⚠️ Low Time</span>
    </div>
  );
}
