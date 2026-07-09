import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { DividerProps, dividerVariants } from "./Divider.types";

const Divider = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, DividerProps>(
  ({ className, orientation = "horizontal", spacing, decorative = true, label, ...props }, ref) => {
    if (label && orientation === "horizontal") {
      return (
        <div
          className={cn(
            "flex items-center w-full",
            spacing ? dividerVariants({ spacing, orientation: undefined }).split(" ")[0] : "my-4",
            className
          )}
        >
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation="horizontal"
            className="flex-1 h-[1px] bg-border"
            {...props}
          />
          <span className="mx-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="horizontal"
            className="flex-1 h-[1px] bg-border"
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation || undefined}
        className={cn(dividerVariants({ orientation, spacing }), className)}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

PrimitiveRegistry.register({
  id: "primitive-divider",
  name: "Divider",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description:
    "Semantic separator supporting horizontal/vertical orientations and optional inline labels.",
  dependencies: ["@radix-ui/react-separator", "class-variance-authority"],
  tokens: ["bg-border", "text-muted-foreground"],
  accessibility: ["role separator", "decorative"],
  responsive: true,
  motion: ["none"],
  component: Divider,
});

export { Divider };
