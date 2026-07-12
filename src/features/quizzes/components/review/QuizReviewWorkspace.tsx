"use client";
import React from "react";
import { useQuizReview } from "../../review";

interface QuizReviewWorkspaceProps {
  className?: string;
  headerSlot?: React.ReactNode;
  bodySlot?: React.ReactNode;
  sidebarSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  overlaySlot?: React.ReactNode;
}

export function QuizReviewWorkspace({
  className = "",
  headerSlot,
  bodySlot,
  sidebarSlot,
  footerSlot,
  overlaySlot,
}: QuizReviewWorkspaceProps) {
  const { fullscreenMode } = useQuizReview();

  return (
    <div
      className={`flex flex-col relative bg-gray-50 overflow-hidden ${fullscreenMode ? "fixed inset-0 z-50" : "w-full h-full"} ${className}`}
    >
      {headerSlot && <header className="shrink-0 z-10">{headerSlot}</header>}

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarSlot && <aside className="shrink-0 z-10">{sidebarSlot}</aside>}
        <main className="flex-1 overflow-y-auto relative">{bodySlot}</main>
      </div>

      {footerSlot && <footer className="shrink-0 z-10">{footerSlot}</footer>}
      {overlaySlot && (
        <div className="absolute inset-0 pointer-events-none z-40">{overlaySlot}</div>
      )}
    </div>
  );
}
