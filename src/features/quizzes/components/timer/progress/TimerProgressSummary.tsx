"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

export function TimerProgressSummary({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  return (
    <div className={`flex items-center justify-between text-sm text-gray-500 ${className}`}>
      <span>{time.percentageComplete.toFixed(0)}% Complete</span>
      <span>{time.displayTime} left</span>
    </div>
  );
}
