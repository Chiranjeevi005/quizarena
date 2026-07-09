import * as React from "react";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import {
  HeadingProps,
  TextProps,
  BlockquoteProps,
  headingVariants,
  textVariants,
} from "./Typography.types";

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, ...props }, ref) => {
    const Component = `h${level}` as any;
    return <Component ref={ref} className={cn(headingVariants({ level, className }))} {...props} />;
  }
);
Heading.displayName = "Heading";

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, as: Component = "p", ...props }, ref) => {
    return <Component ref={ref} className={cn(textVariants({ variant, className }))} {...props} />;
  }
);
Text.displayName = "Text";

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
Blockquote.displayName = "Blockquote";

PrimitiveRegistry.register({
  id: "primitive-typography",
  name: "Typography",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Semantic text variants (Heading, Text, Blockquote) enforcing typography tokens.",
  dependencies: ["class-variance-authority"],
  tokens: ["text-foreground", "text-muted-foreground"],
  accessibility: ["semantic html", "heading hierarchy"],
  responsive: true,
  motion: ["none"],
  component: Text, // Exposing Text as the representative component
});

export { Heading, Text, Blockquote };
