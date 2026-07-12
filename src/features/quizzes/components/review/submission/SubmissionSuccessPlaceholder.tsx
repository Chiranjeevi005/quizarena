"use client";
import React from "react";

export function SubmissionSuccessPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-green-200 shadow-sm text-center ${className}`}
    >
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">
        ✓
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful</h2>
      <p className="text-gray-500 max-w-sm">
        Your answers have been securely recorded. You may now safely leave this page or view your
        results.
      </p>
    </div>
  );
}
