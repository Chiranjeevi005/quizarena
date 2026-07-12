"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";

export function SessionInformationPanel({ className = "" }: { className?: string }) {
  const { session } = useQuizTimer();

  return (
    <div
      className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-2 ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-900">Session Information</h3>
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <span className="text-gray-500">Phase:</span>
        <span className="font-medium text-gray-900">{session.phase}</span>

        <span className="text-gray-500">Health:</span>
        <span className="font-medium text-gray-900">{session.health}</span>

        <span className="text-gray-500">Locked:</span>
        <span className="font-medium text-gray-900">{session.isLocked ? "Yes" : "No"}</span>
      </div>
      {session.message && (
        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">{session.message}</div>
      )}
    </div>
  );
}
