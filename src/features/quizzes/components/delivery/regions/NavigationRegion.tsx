"use client";
import React from "react";
import { QuizNavigation } from "../../../components/navigation";
import { useQuizDelivery } from "../../../delivery";

export function NavigationRegion({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { navigationVisible } = useQuizDelivery();

  if (!navigationVisible) return null;

  return (
    <div className={`h-full ${className}`}>
      <QuizNavigation className="h-full border-none rounded-none shadow-none">
        {children}
      </QuizNavigation>
    </div>
  );
}
