import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { ProgressProps, progressVariants, progressIndicatorVariants } from "./Progress.types";

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, size, variant, progressType = "linear", ...props }, ref) => {
    // Currently only 'linear' is fully implemented as requested,
    // but the API is future-proofed.
    if (progressType !== "linear") {
      console.warn(
        `[Progress] Type '${progressType}' is not yet implemented. Falling back to 'linear'.`
      );
    }

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);
Progress.displayName = "Progress";

PrimitiveRegistry.register({
  id: "primitive-progress",
  name: "Progress",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Accessible progress bar with smooth transitions and semantic colors.",
  dependencies: ["@radix-ui/react-progress", "class-variance-authority"],
  tokens: ["bg-primary", "bg-secondary", "bg-green-500", "bg-destructive", "bg-amber-500"],
  accessibility: ["aria-valuenow", "aria-valuemin", "aria-valuemax", "role progressbar"],
  responsive: true,
  motion: ["transform transition"],
  component: Progress,
});

export { Progress };
