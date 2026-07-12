"use client";
import React from "react";
import { useQuizReview, SubmissionState } from "../../../review";

export function ReadinessBadge({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness) return null;

  let bgClass = "bg-gray-100 text-gray-800";
  if (readiness.state === SubmissionState.READY) bgClass = "bg-green-100 text-green-800";
  if (readiness.state === SubmissionState.WARNING) bgClass = "bg-amber-100 text-amber-800";
  if (readiness.state === SubmissionState.BLOCKED) bgClass = "bg-red-100 text-red-800";

  return (
    <div
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${bgClass} ${className}`}
    >
      {readiness.state.replace("_", " ")}
    </div>
  );
}
