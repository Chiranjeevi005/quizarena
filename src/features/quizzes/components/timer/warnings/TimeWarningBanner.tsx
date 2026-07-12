"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function TimeWarningBanner({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  if (time.warningLevel === QuizTimerWarningLevel.NORMAL) return null;

  const isCritical = time.warningLevel === QuizTimerWarningLevel.CRITICAL;

  return (
    <div
      className={`w-full p-3 flex items-center gap-3 text-sm font-medium rounded-md ${isCritical ? "bg-red-50 text-red-800 border border-red-200" : "bg-amber-50 text-amber-800 border border-amber-200"} ${className}`}
      role={isCritical ? "alert" : "status"}
    >
      <span className="text-lg">{isCritical ? "🚨" : "⚠️"}</span>
      <div>
        Only <strong>{time.displayTime}</strong> remaining. Please wrap up your work.
      </div>
    </div>
  );
}
