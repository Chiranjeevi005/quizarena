"use client";
import React from "react";

export function QuizDeliveryLoading({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full h-full bg-gray-50 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading Quiz Workspace...</p>
      </div>
    </div>
  );
}
