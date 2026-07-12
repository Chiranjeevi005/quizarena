"use client";
import React from "react";
import { QuizSessionStatus } from "../../../components/session";

export function StatusRegion({ className = "" }: { className?: string }) {
  // Composes the Session Status
  return (
    <div className={`${className}`}>
      <QuizSessionStatus />
    </div>
  );
}
