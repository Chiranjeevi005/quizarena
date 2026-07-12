"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function MissingAnswerPanel({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness || readiness.unansweredCount === 0) return null;

  return (
    <div
      className={`p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-start gap-3 ${className}`}
    >
      <span className="text-lg mt-0.5">⚠️</span>
      <div>
        <strong className="block mb-1">Incomplete Assessment</strong>
        You still have {readiness.unansweredCount} unanswered{" "}
        {readiness.unansweredCount === 1 ? "question" : "questions"}. Are you sure you want to
        proceed?
      </div>
    </div>
  );
}
