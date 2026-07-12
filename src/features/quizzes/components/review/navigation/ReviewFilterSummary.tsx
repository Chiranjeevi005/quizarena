"use client";
import React from "react";
import { useQuizReview, ReviewFilter } from "../../../review";

export function ReviewFilterSummary({ className = "" }: { className?: string }) {
  const { filter, dispatch } = useQuizReview();

  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">Filter by Status</label>
      <select
        value={filter}
        onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value as ReviewFilter })}
        className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value={ReviewFilter.ALL}>All Questions</option>
        <option value={ReviewFilter.ANSWERED}>Answered</option>
        <option value={ReviewFilter.UNANSWERED}>Unanswered</option>
        <option value={ReviewFilter.FLAGGED}>Flagged</option>
        <option value={ReviewFilter.BOOKMARKED}>Bookmarked</option>
      </select>
    </div>
  );
}
