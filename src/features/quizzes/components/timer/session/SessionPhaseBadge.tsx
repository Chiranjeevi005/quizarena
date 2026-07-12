"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

export function SessionPhaseBadge({ className = "" }: { className?: string }) {
  const { session } = useQuizTimer();

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md border border-gray-200 bg-white text-xs font-medium text-gray-700 shadow-sm ${className}`}
      role="status"
    >
      Phase: {session.phase}
    </div>
  );
}
