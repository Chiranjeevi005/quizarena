import * as React from "react";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { SkeletonProps } from "./Skeleton.types";

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}
Skeleton.displayName = "Skeleton";

PrimitiveRegistry.register({
  id: "primitive-skeleton",
  name: "Skeleton",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Placeholder component for optimistic loading states.",
  dependencies: [],
  tokens: ["bg-muted"],
  accessibility: ["visual indicator"],
  responsive: true,
  motion: ["pulse"],
  component: Skeleton,
});

export { Skeleton };
