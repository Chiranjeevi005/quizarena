"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewProgressSummary({ className = "" }: { className?: string }) {
  const { statistics } = useQuizReview();
  if (!statistics) return null;

  return (
    <div className={`p-4 border-b border-gray-200 bg-gray-50 ${className}`}>
      <div className="flex items-end justify-between mb-2">
        <div className="text-sm font-medium text-gray-700">Completion</div>
        <div className="text-sm font-bold text-indigo-600">
          {statistics.completionPercentage.toFixed(0)}%
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-indigo-600 h-1.5 rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, statistics.completionPercentage))}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{statistics.totalAnswered} Answered</span>
        <span>{statistics.totalUnanswered} Unanswered</span>
      </div>
    </div>
  );
}
