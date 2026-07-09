import * as React from "react";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { BadgeProps, badgeVariants } from "./Badge.types";

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  }
);
Badge.displayName = "Badge";

PrimitiveRegistry.register({
  id: "primitive-badge",
  name: "Badge",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Static visual indicator for statuses, roles, and labels.",
  dependencies: ["class-variance-authority"],
  tokens: ["bg-primary", "bg-secondary", "bg-destructive"],
  accessibility: ["visual only", "not interactive"],
  responsive: true,
  motion: ["none"],
  component: Badge,
});

export { Badge };
