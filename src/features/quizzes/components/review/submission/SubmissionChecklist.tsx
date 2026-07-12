"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function SubmissionChecklist({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness || !readiness.checklistItems || readiness.checklistItems.length === 0) return null;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">Submission Checklist</h3>
      <ul className="space-y-2">
        {readiness.checklistItems.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className={`mt-0.5 ${item.isComplete ? "text-green-500" : "text-gray-300"}`}>
              {item.isComplete ? "✅" : "⭕"}
            </span>
            <div>
              <span
                className={`text-sm ${item.isComplete ? "text-gray-700" : "text-gray-900 font-medium"}`}
              >
                {item.label}
              </span>
              {item.isRequired && !item.isComplete && (
                <span className="ml-2 text-xs text-red-600 font-semibold">*Required</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
