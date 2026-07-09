import { HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow transition-all duration-200",
  {
    variants: {
      state: {
        default: "",
        hover: "hover:shadow-md hover:border-border/80 cursor-pointer",
        selected: "ring-2 ring-primary border-primary shadow-md",
        loading: "opacity-70 pointer-events-none",
        success: "border-green-500 bg-green-50/50 dark:bg-green-900/10",
        warning: "border-amber-500 bg-amber-50/50 dark:bg-amber-900/10",
        error: "border-destructive bg-destructive/10",
        disabled: "opacity-50 pointer-events-none grayscale-[0.5]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardToolbarProps = HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
