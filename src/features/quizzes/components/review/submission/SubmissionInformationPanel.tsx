"use client";
import React from "react";

export function SubmissionInformationPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-sm ${className}`}
    >
      <h4 className="font-semibold mb-1">About Submission</h4>
      <p className="opacity-90">
        After submitting, your results will be calculated automatically. If this is a timed
        assessment, submitting early will lock your answers and you cannot return.
      </p>
    </div>
  );
}
