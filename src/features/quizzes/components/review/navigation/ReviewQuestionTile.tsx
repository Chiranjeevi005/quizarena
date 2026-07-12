"use client";
import React from "react";
import { useQuizReview } from "../../../review";
import { QuestionReviewPresentation } from "../../../review";

export function ReviewQuestionTile({
  question,
  className = "",
}: {
  question: QuestionReviewPresentation;
  className?: string;
}) {
  const { selectedQuestionId, dispatch } = useQuizReview();
  const isSelected = selectedQuestionId === question.id;

  let bgClass = "bg-white hover:bg-gray-50 text-gray-700 border-gray-200";
  if (isSelected) {
    bgClass = "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm";
  }

  return (
    <button
      onClick={() => dispatch({ type: "SELECT_QUESTION", payload: question.id })}
      className={`w-full text-left p-3 rounded-lg border flex items-center justify-between transition-colors ${bgClass} ${className}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${question.isAnswered ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}
        >
          {question.order}
        </span>
        <span className="text-sm font-medium truncate w-32">{question.title}</span>
      </div>
      <div className="flex gap-1 text-xs">
        {question.isFlagged && <span>🚩</span>}
        {question.isBookmarked && <span>🔖</span>}
      </div>
    </button>
  );
}
