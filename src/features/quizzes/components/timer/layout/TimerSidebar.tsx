"use client";
import React from "react";

export function TimerSidebar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`w-80 h-full border-l border-gray-200 bg-white flex flex-col shrink-0 overflow-y-auto ${className}`}
    >
      {children}
    </aside>
  );
}
