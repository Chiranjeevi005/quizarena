"use client";
import React from "react";

export function SubmissionFailurePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-red-200 shadow-sm text-center ${className}`}
    >
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4">
        !
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Failed</h2>
      <p className="text-gray-500 max-w-sm mb-6">
        A network error occurred while submitting. Your answers are saved locally.
      </p>
      <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
        Retry Submission
      </button>
    </div>
  );
}
