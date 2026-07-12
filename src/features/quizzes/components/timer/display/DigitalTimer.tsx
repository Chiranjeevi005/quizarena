"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";
import { QuizTimerSize } from "../../../timer/QuizTimerSize";

export function DigitalTimer({ className = "" }: { className?: string }) {
  const { time, config } = useQuizTimer();

  let colorClass = "text-gray-900";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING) colorClass = "text-amber-600";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL)
    colorClass = "text-red-600 animate-pulse";

  let sizeClass = "text-3xl";
  if (config.size === QuizTimerSize.XS) sizeClass = "text-sm";
  if (config.size === QuizTimerSize.SM) sizeClass = "text-lg";
  if (config.size === QuizTimerSize.MD) sizeClass = "text-3xl";
  if (config.size === QuizTimerSize.LG) sizeClass = "text-5xl";
  if (config.size === QuizTimerSize.XL) sizeClass = "text-7xl";

  return (
    <div
      className={`font-mono font-bold tracking-tight ${colorClass} ${sizeClass} ${className}`}
      role="timer"
      aria-live="off"
    >
      {time.displayTime}
    </div>
  );
}
