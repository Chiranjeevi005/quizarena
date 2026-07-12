"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewSubmissionRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { submissionVisible } = useQuizReview();
  if (!submissionVisible) return null;

  return (
    <div className={`w-full bg-indigo-50 border-t border-indigo-200 z-20 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
