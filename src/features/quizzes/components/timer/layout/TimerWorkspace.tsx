"use client";
import React from "react";

export function TimerWorkspace({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col w-full h-full relative overflow-hidden bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}
