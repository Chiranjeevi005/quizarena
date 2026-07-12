"use client";
import React from "react";

export interface QuizTimerFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function QuizTimerFooter({ children, className = "" }: QuizTimerFooterProps) {
  return (
    <div className={`px-4 py-3 border-t border-gray-200 bg-white shrink-0 ${className}`}>
      {children}
    </div>
  );
}
