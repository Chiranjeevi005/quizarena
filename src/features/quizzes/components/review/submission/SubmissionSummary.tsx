"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function SubmissionSummary({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness) return null;

  return (
    <div
      className={`p-6 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center ${className}`}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Submit?</h2>
      <p className="text-gray-600 mb-6">
        You have answered {readiness.answeredCount} out of{" "}
        {readiness.answeredCount + readiness.unansweredCount} questions.
      </p>

      <div className="w-full max-w-sm">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Completion</span>
          <span className="font-bold text-indigo-600">
            {readiness.completionPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, readiness.completionPercentage))}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
