"use client";
import React from "react";
import { useQuizReview } from "../../review";
import { QuizReviewState } from "../../review";

export function QuizReviewStatus({ className = "" }: { className?: string }) {
  const { state } = useQuizReview();
  return (
    <div className={`text-xs text-gray-500 font-medium ${className}`} role="status">
      Review Status: {state}
    </div>
  );
}
