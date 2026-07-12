"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerWarningLevel } from "../../../timer/QuizTimerWarningLevel";

export function TimerProgressRing({
  className = "",
  size = 120,
  strokeWidth = 8,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const { time } = useQuizTimer();

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Calculate offset based on percentage complete (0-100)
  const offset = circumference - ((100 - time.percentageComplete) / 100) * circumference;

  let colorClass = "text-indigo-600";
  if (time.warningLevel === QuizTimerWarningLevel.WARNING) colorClass = "text-amber-500";
  if (time.warningLevel === QuizTimerWarningLevel.CRITICAL) colorClass = "text-red-600";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="timer"
      aria-live="off"
    >
      {/* Background ring */}
      <svg className="absolute top-0 left-0 -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress ring */}
        <circle
          className={`transition-all duration-500 ease-in-out ${colorClass}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
        <span
          className={`font-bold ${size > 100 ? "text-2xl" : "text-sm"} ${time.warningLevel === QuizTimerWarningLevel.CRITICAL ? "text-red-600 animate-pulse" : "text-gray-900"}`}
        >
          {time.displayTime}
        </span>
      </div>
    </div>
  );
}
