"use client";
import React from "react";

export function ReviewSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mb-10 ${className}`}>{children}</section>;
}
