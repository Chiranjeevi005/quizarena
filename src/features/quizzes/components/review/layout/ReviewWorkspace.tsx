"use client";
import React from "react";
import { useQuizReview } from "../../../review";

export function ReviewWorkspace({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { fullscreenMode } = useQuizReview();
  return (
    <div
      className={`flex w-full bg-gray-50 overflow-hidden ${fullscreenMode ? "fixed inset-0 z-50 h-screen" : "h-full"} ${className}`}
    >
      {children}
    </div>
  );
}
