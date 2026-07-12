"use client";
import React from "react";
import { useQuizDelivery } from "../../delivery";

interface QuizDeliveryWorkspaceProps {
  children: React.ReactNode;
  className?: string;
}

export function QuizDeliveryWorkspace({ children, className = "" }: QuizDeliveryWorkspaceProps) {
  const { fullscreenMode } = useQuizDelivery();

  return (
    <div
      className={`flex flex-col bg-gray-50 overflow-hidden relative ${fullscreenMode ? "fixed inset-0 z-50 h-screen w-screen" : "w-full h-full min-h-[600px] rounded-xl border border-gray-200"} ${className}`}
    >
      {children}
    </div>
  );
}
