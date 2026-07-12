"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function ToolbarRegion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { toolbarVisible } = useQuizDelivery();

  if (!toolbarVisible) return null;

  // In the future this will wrap Enterprise Toolbar Platform.
  // For now, it simply acts as a standard flex boundary.
  return <div className={`flex items-center gap-2 ${className}`}>{children}</div>;
}
