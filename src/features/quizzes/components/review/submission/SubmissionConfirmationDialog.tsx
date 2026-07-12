"use client";
import React from "react";
import { useQuizReview, QuizReviewState } from "../../../review";

export function SubmissionConfirmationDialog({ className = "" }: { className?: string }) {
  const { state, dispatch } = useQuizReview();

  if (state !== QuizReviewState.CONFIRMING) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <h2 id="dialog-title" className="text-xl font-bold text-gray-900 mb-2">
            Confirm Submission
          </h2>
          <p className="text-gray-600 text-sm">
            Are you sure you want to submit? Once submitted, you will not be able to change your
            answers.
          </p>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            onClick={() => dispatch({ type: "CANCEL_SUBMISSION" })}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => dispatch({ type: "SET_STATE", payload: QuizReviewState.SUBMITTING })}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
}
