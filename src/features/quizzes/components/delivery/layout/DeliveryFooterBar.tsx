"use client";
import React from "react";

export function DeliveryFooterBar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full bg-white border-t border-gray-200 p-4 z-10 shrink-0 ${className}`}>
      {children}
    </div>
  );
}
