"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function DeliverySidebar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { sidebarVisible } = useQuizDelivery();
  if (!sidebarVisible) return null;

  return (
    <aside
      className={`shrink-0 w-72 h-full border-r border-gray-200 bg-white shadow-sm z-10 flex flex-col ${className}`}
    >
      {children}
    </aside>
  );
}
