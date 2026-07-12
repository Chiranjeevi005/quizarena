"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

export function EstimatedCompletion({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  // Note: this is a presentation mock. In a real scenario, this would be computed or passed via context
  return (
    <div className={`text-xs text-gray-500 flex items-center gap-1 ${className}`}>
      <span>Est. Completion:</span>
      <span className="font-medium text-gray-700">
        ~{Math.ceil(time.remainingTimeMs / 60000)} mins
      </span>
    </div>
  );
}
