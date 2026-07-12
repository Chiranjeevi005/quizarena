"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function QuestionReviewInspector({ className = "" }: { className?: string }) {
  const { inspectorVisible, dispatch } = useQuizReview();

  if (!inspectorVisible) return null;

  return (
    <div className={`w-80 bg-white border-l border-gray-200 h-full flex flex-col ${className}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Inspector</h3>
        <button
          onClick={() => dispatch({ type: "TOGGLE_INSPECTOR" })}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-sm text-gray-500">
          Detailed question metadata, AI analysis, or moderator notes will appear here.
        </p>
      </div>
    </div>
  );
}
