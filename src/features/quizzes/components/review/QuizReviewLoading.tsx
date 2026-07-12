"use client";
import React from "react";

export function QuizReviewLoading({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full h-full bg-gray-50 ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
}
