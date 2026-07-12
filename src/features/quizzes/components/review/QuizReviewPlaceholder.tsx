"use client";
import React from "react";

export function QuizReviewPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 ${className}`}
    >
      Review Area Placeholder
    </div>
  );
}
