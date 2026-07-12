"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function CompletionSummary({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness) return null;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-1">Assessment Completion</h3>
      <p className="text-gray-500 text-sm mb-4">
        You have answered {readiness.answeredCount} of{" "}
        {readiness.answeredCount + readiness.unansweredCount} questions.
      </p>
    </div>
  );
}
