"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function CriticalTimeIndicator({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  if (time.warningLevel !== QuizTimerWarningLevel.CRITICAL) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-800 animate-bounce ${className}`}
    >
      <span>🚨 Critical</span>
    </div>
  );
}
