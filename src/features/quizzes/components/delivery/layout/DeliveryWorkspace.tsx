"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function DeliveryWorkspace({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { fullscreenMode } = useQuizDelivery();
  return (
    <div
      className={`flex w-full bg-gray-50 overflow-hidden ${fullscreenMode ? "fixed inset-0 z-50 h-screen" : "h-full"} ${className}`}
    >
      {children}
    </div>
  );
}
