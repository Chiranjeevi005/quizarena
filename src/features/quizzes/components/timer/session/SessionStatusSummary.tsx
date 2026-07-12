"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

export function SessionStatusSummary({ className = "" }: { className?: string }) {
  const { session } = useQuizTimer();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700">{session.phase}</span>
      {session.isLocked && (
        <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded">Locked</span>
      )}
    </div>
  );
}
