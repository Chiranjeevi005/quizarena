"use client";
import React from "react";

export function QuizDeliveryEmpty({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full bg-gray-50 text-gray-500 ${className}`}
    >
      <span className="text-4xl mb-4">📭</span>
      <p className="font-medium">No active delivery session.</p>
    </div>
  );
}
