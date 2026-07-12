"use client";
import React from "react";
import { useQuizReview, SubmissionSeverity } from "../../../review";

export function SubmissionWarningBanner({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness || readiness.warningCount === 0) return null;

  const isCritical = readiness.severity === SubmissionSeverity.CRITICAL;

  return (
    <div
      className={`p-4 rounded-lg flex gap-3 text-sm font-medium ${isCritical ? "bg-red-50 text-red-800 border border-red-200" : "bg-amber-50 text-amber-800 border border-amber-200"} ${className}`}
      role="status"
    >
      <span className="text-lg">{isCritical ? "🚨" : "⚠️"}</span>
      <div>
        <strong className="block mb-1">Attention Required</strong>
        You have {readiness.warningCount} {readiness.warningCount === 1 ? "warning" : "warnings"}{" "}
        preventing an optimal submission.
      </div>
    </div>
  );
}
