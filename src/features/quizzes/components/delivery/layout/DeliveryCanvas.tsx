"use client";
import React from "react";

export function DeliveryCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex-1 overflow-y-auto flex flex-col items-center bg-gray-50 relative ${className}`}
    >
      <div className="w-full max-w-4xl flex flex-col flex-1">{children}</div>
    </div>
  );
}
