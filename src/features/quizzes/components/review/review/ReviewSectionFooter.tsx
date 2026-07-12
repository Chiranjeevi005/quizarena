"use client";
import React from "react";

export function ReviewSectionFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-gray-100 flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
