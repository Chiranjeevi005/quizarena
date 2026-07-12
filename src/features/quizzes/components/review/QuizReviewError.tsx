"use client";
import React from "react";

export function QuizReviewError({
  message = "An error occurred loading the review.",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full bg-red-50 text-red-600 ${className}`}
    >
      <span className="text-4xl mb-4">⚠️</span>
      <p>{message}</p>
    </div>
  );
}
