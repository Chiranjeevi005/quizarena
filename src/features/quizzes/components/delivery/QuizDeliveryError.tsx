"use client";
import React from "react";

export function QuizDeliveryError({
  message = "An error occurred in the delivery workspace.",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full bg-red-50 text-red-600 ${className}`}
    >
      <span className="text-4xl mb-4">⚠️</span>
      <p className="font-bold mb-2">Delivery Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
