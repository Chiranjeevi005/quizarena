import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utilities";
import { ButtonProps, buttonVariants } from "./Button.types";
import { PrimitiveRegistry } from "@/registry";
import { Icon } from "@/icons";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, state, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isLoading = state === "loading";
    const isDisabled = state === "disabled" || props.disabled;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, state, className }))}
        ref={ref}
        disabled={isDisabled || isLoading}
        aria-disabled={isDisabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

PrimitiveRegistry.register({
  id: "primitive-button",
  name: "Button",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Primary interactive element with extensive variants and lifecycle states.",
  dependencies: ["@radix-ui/react-slot", "IconRegistry", "class-variance-authority"],
  tokens: ["bg-primary", "text-primary-foreground", "bg-secondary", "bg-destructive", "bg-accent"],
  accessibility: ["aria-disabled", "aria-busy", "keyboard focus", "screen readers"],
  responsive: true,
  motion: ["hover", "focus", "active"],
  component: Button,
});

export { Button };
