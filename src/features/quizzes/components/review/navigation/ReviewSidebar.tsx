"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewSidebar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { navigationVisible } = useQuizReview();
  if (!navigationVisible) return null;

  return (
    <aside className={`w-72 bg-white border-r border-gray-200 h-full flex flex-col ${className}`}>
      {children}
    </aside>
  );
}
