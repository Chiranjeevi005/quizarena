"use client";
import React from "react";

export interface QuizTimerToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function QuizTimerToolbar({ children, className = "" }: QuizTimerToolbarProps) {
  return (
    <div className={`flex items-center gap-2 p-2 bg-gray-100 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
