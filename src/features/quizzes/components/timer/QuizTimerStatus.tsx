"use client";
import React from "react";

export interface QuizTimerStatusProps {
  children: React.ReactNode;
  className?: string;
}

export function QuizTimerStatus({ children, className = "" }: QuizTimerStatusProps) {
  return (
    <div
      className={`w-full bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2 text-sm text-blue-800 shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}
