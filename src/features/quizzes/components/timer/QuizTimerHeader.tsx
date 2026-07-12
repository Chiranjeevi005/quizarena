"use client";
import React from "react";

export interface QuizTimerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function QuizTimerHeader({ children, className = "" }: QuizTimerHeaderProps) {
  return (
    <div
      className={`px-4 py-3 border-b border-gray-200 bg-white flex items-center justify-between shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}
