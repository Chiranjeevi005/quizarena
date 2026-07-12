"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";
import { QuizTimerSize } from "../../../timer/QuizTimerSize";

export function CompactTimer({ className = "" }: { className?: string }) {
  const { time, config } = useQuizTimer();

  let bgClass = "bg-gray-100 text-gray-800";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING) bgClass = "bg-amber-100 text-amber-800";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL)
    bgClass = "bg-red-100 text-red-800 animate-pulse";

  let paddingClass = "px-3 py-1";
  let textClass = "text-sm";
  if (config.size === QuizTimerSize.XS) {
    paddingClass = "px-2 py-0.5";
    textClass = "text-xs";
  }
  if (config.size === QuizTimerSize.LG) {
    paddingClass = "px-4 py-2";
    textClass = "text-lg";
  }
  if (config.size === QuizTimerSize.XL) {
    paddingClass = "px-6 py-3";
    textClass = "text-2xl";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-md font-mono font-medium ${bgClass} ${paddingClass} ${textClass} ${className}`}
      role="timer"
      aria-live="off"
    >
      <span>⏱</span>
      {time.displayTime}
    </div>
  );
}
