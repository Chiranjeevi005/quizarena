"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewInspectorRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { inspectorVisible } = useQuizReview();
  if (!inspectorVisible) return null;

  return (
    <div
      className={`shrink-0 h-full border-l border-gray-200 bg-white shadow-sm z-10 ${className}`}
    >
      {children}
    </div>
  );
}
