"use client";

import React, { Suspense, ReactNode } from "react";
import { Spinner } from "./Spinner";

interface LoadingBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LoadingBoundary({ children, fallback }: LoadingBoundaryProps) {
  return <Suspense fallback={fallback || <Spinner />}>{children}</Suspense>;
}
