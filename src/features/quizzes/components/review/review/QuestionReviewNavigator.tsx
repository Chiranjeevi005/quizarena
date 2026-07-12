"use client";
import React from "react";

export function QuestionReviewNavigator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">
        ← Previous
      </button>
      <span className="text-sm font-semibold text-gray-500">Question 1 of 10</span>
      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">
        Next →
      </button>
    </div>
  );
}
