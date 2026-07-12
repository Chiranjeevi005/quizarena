"use client";
import React from "react";
import { useQuizReview, SubmissionState } from "../../../review";

export function SubmissionReadiness({ className = "" }: { className?: string }) {
  const { readiness, dispatch } = useQuizReview();
  if (!readiness) return null;

  const isReady = readiness.state === SubmissionState.READY;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <button
        onClick={() => dispatch({ type: "INITIATE_SUBMISSION" })}
        disabled={readiness.state === SubmissionState.BLOCKED}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-sm transition-colors ${isReady ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}
      >
        Submit Assessment
      </button>

      {!isReady && (
        <p className="text-sm text-center text-gray-500">
          Please review the warnings before submitting.
        </p>
      )}
    </div>
  );
}
