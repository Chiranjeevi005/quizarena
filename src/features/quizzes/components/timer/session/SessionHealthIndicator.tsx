"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { SessionHealth } from "../../../timer/SessionHealth";

export function SessionHealthIndicator({ className = "" }: { className?: string }) {
  const { session } = useQuizTimer();

  let colorClass = "bg-gray-300";
  if (session.health === SessionHealth.NORMAL) colorClass = "bg-green-500";
  if (session.health === SessionHealth.WARNING) colorClass = "bg-amber-500";
  if (session.health === SessionHealth.CRITICAL) colorClass = "bg-red-500 animate-pulse";
  if (session.health === SessionHealth.LOCKED) colorClass = "bg-purple-500";

  return (
    <div className={`flex items-center gap-2 ${className}`} title={`Health: ${session.health}`}>
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
      <span className="text-xs text-gray-500 capitalize">{session.health.toLowerCase()}</span>
    </div>
  );
}
