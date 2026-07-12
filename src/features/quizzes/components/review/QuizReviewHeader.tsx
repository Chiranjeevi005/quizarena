"use client";
import React from "react";

export function QuizReviewHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
}
