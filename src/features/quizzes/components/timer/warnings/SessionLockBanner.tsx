"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

export function SessionLockBanner({ className = "" }: { className?: string }) {
  const { session } = useQuizTimer();

  if (!session.isLocked) return null;

  return (
    <div
      className={`w-full p-3 flex items-center gap-3 text-sm font-medium bg-purple-50 text-purple-800 border border-purple-200 rounded-md ${className}`}
      role="alert"
    >
      <span className="text-lg">🔒</span>
      <div>
        <strong>Session Locked:</strong>{" "}
        {session.message ||
          "This session has been temporarily locked by an administrator or proctor."}
      </div>
    </div>
  );
}
