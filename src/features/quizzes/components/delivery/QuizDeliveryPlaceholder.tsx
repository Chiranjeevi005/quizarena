"use client";
import React from "react";

export function QuizDeliveryPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium ${className}`}
    >
      Delivery Workspace Placeholder
    </div>
  );
}
