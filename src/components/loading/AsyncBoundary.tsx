"use client";

import React, { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingBoundary } from "./LoadingBoundary";

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: React.ComponentType<any>;
}

export function AsyncBoundary({ children, loadingFallback, errorFallback }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <LoadingBoundary fallback={loadingFallback}>{children}</LoadingBoundary>
    </ErrorBoundary>
  );
}
