"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function CompletionChecklist({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness || !readiness.checklistItems) return null;

  return (
    <div
      className={`w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}
    >
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h4 className="font-semibold text-gray-700 text-sm">Submission Requirements</h4>
      </div>
      <ul className="divide-y divide-gray-100">
        {readiness.checklistItems.map((item) => (
          <li key={item.id} className="p-4 flex items-center justify-between">
            <span
              className={`text-sm ${item.isComplete ? "text-gray-500" : "text-gray-900 font-medium"}`}
            >
              {item.label}
            </span>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full ${item.isComplete ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
            >
              {item.isComplete ? "✓" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
