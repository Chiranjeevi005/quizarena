"use client";
import React from "react";

export interface QuizTimerBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function QuizTimerBody({ children, className = "" }: QuizTimerBodyProps) {
  return (
    <div className={`flex-1 p-4 bg-gray-50 flex flex-col overflow-auto ${className}`}>
      {children}
    </div>
  );
}
