"use client";
import React from "react";

export function ReviewQuestionGroup({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 last:mb-0 ${className}`}>
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
        {title}
      </h4>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}
