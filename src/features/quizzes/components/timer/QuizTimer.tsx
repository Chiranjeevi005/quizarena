"use client";
import React, { ReactNode, useEffect } from "react";
import { ComponentRegistry } from "@/registry";
import { useQuizTimer } from "../../timer/QuizTimerContext";

export interface QuizTimerProps {
  children?: ReactNode;
  className?: string;
  headerSlot?: ReactNode;
  bodySlot?: ReactNode;
  footerSlot?: ReactNode;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  statusSlot?: ReactNode;
  overlaySlot?: ReactNode;
}

export function QuizTimer({
  children,
  className = "",
  headerSlot,
  bodySlot,
  footerSlot,
  leadingSlot,
  trailingSlot,
  statusSlot,
  overlaySlot,
}: QuizTimerProps) {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-timer",
      name: "QuizTimer",
      category: "quiz",
      subtype: "timer",
      version: "1.0.0",
      status: "stable",
      owner: "workspace-architecture",
    });
  }, []);

  return (
    <div
      className={`flex flex-col w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 relative overflow-hidden ${className}`}
    >
      {headerSlot}
      {statusSlot}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex w-full h-full">
          {leadingSlot && <div className="shrink-0 border-r border-gray-200">{leadingSlot}</div>}
          <div className="flex-1 flex flex-col overflow-auto">
            {bodySlot}
            {children}
          </div>
          {trailingSlot && <div className="shrink-0 border-l border-gray-200">{trailingSlot}</div>}
        </div>
        {overlaySlot && (
          <div className="absolute inset-0 z-50 pointer-events-none">{overlaySlot}</div>
        )}
      </div>
      {footerSlot}
    </div>
  );
}
