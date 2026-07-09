import * as React from "react";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { Icon } from "@/icons";
import { LoadingIndicatorProps, SpinnerProps, loadingIndicatorVariants } from "./Spinner.types";

const LoadingIndicator = React.forwardRef<HTMLDivElement, LoadingIndicatorProps>(
  ({ className, size, variant, icon = "Loader2", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <Icon
          name={icon as any}
          className={cn(loadingIndicatorVariants({ size, variant }))}
          aria-hidden="true"
        />
      </div>
    );
  }
);
LoadingIndicator.displayName = "LoadingIndicator";

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, label = "Loading...", fullScreen, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("flex flex-col items-center justify-center gap-2", className)}
      >
        <LoadingIndicator {...props} />
        <span className="sr-only">{label}</span>
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          {content}
        </div>
      );
    }

    return content;
  }
);
Spinner.displayName = "Spinner";

PrimitiveRegistry.register({
  id: "primitive-spinner",
  name: "Spinner",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Loading indicator with full screen variants and screen reader support.",
  dependencies: ["IconRegistry", "class-variance-authority"],
  tokens: ["text-muted-foreground", "text-primary", "bg-background"],
  accessibility: ["aria-live polite", "sr-only text", "role status"],
  responsive: true,
  motion: ["spin"],
  component: Spinner,
});

export { LoadingIndicator, Spinner };
