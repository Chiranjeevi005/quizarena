import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

export const dividerVariants = cva("shrink-0 bg-border relative", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    spacing: {
      none: "my-0",
      sm: "my-2",
      default: "my-4",
      lg: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "default",
  },
});

export interface DividerProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, "orientation">,
    VariantProps<typeof dividerVariants> {
  label?: ReactNode;
}
