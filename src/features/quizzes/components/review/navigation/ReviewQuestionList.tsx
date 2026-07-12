"use client";
import React from "react";

export function ReviewQuestionList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex-1 overflow-y-auto p-4 flex flex-col gap-2 ${className}`}>{children}</div>
  );
}
