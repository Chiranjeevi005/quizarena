"use client";
import React from "react";

export function QuestionReviewSummary({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900 ${className}`}
    >
      {children}
    </div>
  );
}
