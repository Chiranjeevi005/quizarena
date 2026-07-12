"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

function formatMs(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function ElapsedTimeDisplay({ className = "" }: { className?: string }) {
  const { time } = useQuizTimer();

  return (
    <div className={`text-sm text-gray-600 flex items-center gap-1.5 ${className}`}>
      <span className="font-medium text-gray-900">{formatMs(time.elapsedTimeMs)}</span> elapsed
    </div>
  );
}
