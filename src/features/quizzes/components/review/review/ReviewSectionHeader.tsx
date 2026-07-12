"use client";
import React from "react";

export function ReviewSectionHeader({
  title,
  count,
  className = "",
}: {
  title: string;
  count?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 mb-4 pb-2 border-b border-gray-200 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {count !== undefined && (
        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
