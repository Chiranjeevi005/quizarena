"use client";
import React from "react";

export function ReviewWarningPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm ${className}`}
    >
      {children}
    </div>
  );
}
