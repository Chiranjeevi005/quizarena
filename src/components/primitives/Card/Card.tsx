import * as React from "react";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import {
  CardProps,
  CardHeaderProps,
  CardToolbarProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  cardVariants,
} from "./Card.types";

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, state, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ state, className }))}
    aria-disabled={state === "disabled" || state === "loading"}
    aria-busy={state === "loading"}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardToolbar = React.forwardRef<HTMLDivElement, CardToolbarProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center space-x-2 px-6 pb-4", className)} {...props} />
  )
);
CardToolbar.displayName = "CardToolbar";

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

PrimitiveRegistry.register({
  id: "primitive-card",
  name: "Card",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Flexible content container supporting headers, toolbars, content, and footers.",
  dependencies: ["class-variance-authority"],
  tokens: ["bg-card", "text-card-foreground", "border-border", "ring-primary"],
  accessibility: ["aria-disabled", "aria-busy"],
  responsive: true,
  motion: ["none"],
  component: Card,
});

export { Card, CardHeader, CardToolbar, CardFooter, CardTitle, CardDescription, CardContent };
