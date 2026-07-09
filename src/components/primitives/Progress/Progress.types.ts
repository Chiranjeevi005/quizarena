import * as ProgressPrimitive from "@radix-ui/react-progress";
import { VariantProps, cva } from "class-variance-authority";

export const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-secondary", {
  variants: {
    size: {
      sm: "h-2",
      default: "h-4",
      lg: "h-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-green-500",
      error: "bg-destructive",
      warning: "bg-amber-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ProgressType = "linear" | "circular" | "step" | "indeterminate";

export interface ProgressProps
  extends
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  progressType?: ProgressType; // To support future variants like circular, step, etc.
}
