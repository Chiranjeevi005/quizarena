"use client";
import React from "react";

export function QuizTimerPlaceholder({ className = "" }: { className?: string }) {
  return <div className={`w-full h-full bg-gray-100 animate-pulse rounded-xl ${className}`} />;
}
