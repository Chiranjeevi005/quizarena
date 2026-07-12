"use client";
import React from "react";
import { QuestionReviewPresentation } from "../../../review";

export function QuestionReviewMetadata({
  question,
  className = "",
}: {
  question: QuestionReviewPresentation;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 text-xs text-gray-500 ${className}`}>
      <span className="bg-gray-100 px-2 py-1 rounded font-medium">{question.type}</span>
      <span>
        {question.points} {question.points === 1 ? "point" : "points"}
      </span>
    </div>
  );
}
