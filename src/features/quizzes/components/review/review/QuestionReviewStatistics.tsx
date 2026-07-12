"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function QuestionReviewStatistics({ className = "" }: { className?: string }) {
  const { statistics } = useQuizReview();
  if (!statistics) return null;

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-900">{statistics.totalQuestions}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
          Total
        </span>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm flex flex-col items-center">
        <span className="text-3xl font-bold text-green-700">{statistics.totalAnswered}</span>
        <span className="text-xs text-green-600 uppercase tracking-wider font-semibold mt-1">
          Answered
        </span>
      </div>
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm flex flex-col items-center">
        <span className="text-3xl font-bold text-red-700">{statistics.totalUnanswered}</span>
        <span className="text-xs text-red-600 uppercase tracking-wider font-semibold mt-1">
          Unanswered
        </span>
      </div>
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-sm flex flex-col items-center">
        <span className="text-3xl font-bold text-amber-700">{statistics.totalFlagged}</span>
        <span className="text-xs text-amber-600 uppercase tracking-wider font-semibold mt-1">
          Flagged
        </span>
      </div>
    </div>
  );
}
