"use client";
import React from "react";
import { useQuizReview, SubmissionState } from "../../../review";

export function SubmissionReadinessPanel({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness) return null;

  const isReady = readiness.state === SubmissionState.READY;

  return (
    <div
      className={`p-5 rounded-xl border ${isReady ? "bg-green-50 border-green-200 text-green-900" : "bg-gray-50 border-gray-200 text-gray-800"} flex flex-col items-center text-center gap-2 ${className}`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${isReady ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}
      >
        {isReady ? "✓" : "ℹ️"}
      </div>
      <h3 className="font-bold text-lg">
        {isReady ? "Ready for Submission" : "Submission Requirements Not Met"}
      </h3>
      <p className="text-sm opacity-80 max-w-sm">
        {isReady
          ? "You have met all requirements and may submit your assessment."
          : "Please complete the remaining requirements before submitting."}
      </p>
    </div>
  );
}
