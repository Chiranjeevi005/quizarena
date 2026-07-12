"use client";
import React from "react";

export function QuizReviewEmpty({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full bg-gray-50 text-gray-400 ${className}`}
    >
      <span className="text-4xl mb-4">📭</span>
      <p>No questions available for review.</p>
    </div>
  );
}
