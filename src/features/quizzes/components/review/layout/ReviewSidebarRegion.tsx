"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewSidebarRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { navigationVisible } = useQuizReview();
  if (!navigationVisible) return null;

  return (
    <div
      className={`shrink-0 h-full border-r border-gray-200 bg-white shadow-sm z-10 ${className}`}
    >
      {children}
    </div>
  );
}
