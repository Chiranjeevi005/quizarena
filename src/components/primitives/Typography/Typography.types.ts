import { HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

export const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    level: {
      1: "text-4xl lg:text-5xl",
      2: "text-3xl pb-2 border-b first:mt-0",
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

export const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      body: "text-base leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      caption: "text-xs text-muted-foreground",
      label: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      metric: "text-3xl font-bold tracking-tighter",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

export type BlockquoteProps = HTMLAttributes<HTMLQuoteElement>;
