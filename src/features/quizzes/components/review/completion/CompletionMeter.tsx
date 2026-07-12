"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function CompletionMeter({ className = "" }: { className?: string }) {
  const { readiness } = useQuizReview();
  if (!readiness) return null;

  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (readiness.completionPercentage / 100) * circumference;

  return (
    <div className={`flex items-center justify-center relative w-32 h-32 ${className}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" className="stroke-gray-200" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className="stroke-indigo-600 transition-all duration-1000 ease-out"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">
          {readiness.completionPercentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
