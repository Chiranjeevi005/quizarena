import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

export const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      selected: {
        true: "ring-2 ring-primary ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  }
);

export interface TagProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">, VariantProps<typeof tagVariants> {
  onDismiss?: () => void;
}
