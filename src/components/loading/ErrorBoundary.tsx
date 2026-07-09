"use client";

import React, { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="p-4 border border-red-500 rounded bg-red-50 text-red-900">
      <p className="font-semibold">Something went wrong:</p>
      <pre className="text-sm mt-2 mb-4 overflow-auto">{(error as Error).message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export function ErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
}) {
  return (
    <ReactErrorBoundary FallbackComponent={fallback || ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
