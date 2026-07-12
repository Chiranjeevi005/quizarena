"use client";
import React from "react";

export function DeliveryTransitionPlaceholder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // This is a strict presentation wrapper intended to be replaced with
  // framer-motion or another animation library in the future business layer.
  return <div className={`transition-opacity duration-300 ${className}`}>{children}</div>;
}
