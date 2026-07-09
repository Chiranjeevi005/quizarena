import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

export const loadingIndicatorVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      success: "text-green-500",
      inverse: "text-primary-foreground",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface LoadingIndicatorProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingIndicatorVariants> {
  icon?: string; // To override the default Loader2 if needed
}

export interface SpinnerProps extends LoadingIndicatorProps {
  label?: string; // Optional accessible label
  fullScreen?: boolean; // Whether to center on the whole screen
}
