"use client";
import React from "react";
import { QuizReviewWorkspace } from "../../../components/review";

export function ReviewRegion({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <QuizReviewWorkspace className="h-full border-none" />
      {children}
    </div>
  );
}
