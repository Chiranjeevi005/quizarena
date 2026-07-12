"use client";
import React from "react";

export function DeliveryViewport({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-col flex-1 min-w-0 ${className}`}>{children}</div>;
}
