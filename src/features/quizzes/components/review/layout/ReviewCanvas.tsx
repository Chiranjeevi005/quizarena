"use client";
import React from "react";

export function ReviewCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex-1 overflow-y-auto p-6 flex flex-col items-center ${className}`}>
      <div className="w-full max-w-4xl flex flex-col gap-6">{children}</div>
    </div>
  );
}
