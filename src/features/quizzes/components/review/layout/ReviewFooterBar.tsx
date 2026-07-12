"use client";
import React from "react";

export function ReviewFooterBar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6 z-10 shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}
