"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { SessionHealth } from "../../../timer/SessionHealth";

export function SessionStatusBadge({ className = "" }: { className?: string }) {
  const { session } = useQuizTimer();

  let bgClass = "bg-gray-100 text-gray-800";
  if (session.health === SessionHealth.NORMAL) bgClass = "bg-green-100 text-green-800";
  if (session.health === SessionHealth.WARNING) bgClass = "bg-amber-100 text-amber-800";
  if (session.health === SessionHealth.CRITICAL) bgClass = "bg-red-100 text-red-800";
  if (session.health === SessionHealth.LOCKED) bgClass = "bg-purple-100 text-purple-800";
  if (session.health === SessionHealth.OFFLINE) bgClass = "bg-gray-200 text-gray-600";

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgClass} ${className}`}
      role="status"
    >
      {session.health}
    </div>
  );
}
