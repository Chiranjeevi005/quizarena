"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewSummaryRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { summaryVisible } = useQuizReview();
  if (!summaryVisible) return null;

  return (
    <div className={`w-full bg-white border-b border-gray-200 z-10 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
