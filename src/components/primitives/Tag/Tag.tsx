import * as React from "react";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { Icon } from "@/icons";
import { TagProps, tagVariants } from "./Tag.types";

const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, variant, selected, onDismiss, children, ...props }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        className={cn(tagVariants({ variant, selected }), className)}
        {...props}
      >
        {children}
        {onDismiss && (
          <span
            role="button"
            tabIndex={0}
            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onDismiss();
              }
            }}
            aria-label="Remove tag"
          >
            <Icon name="X" className="h-3 w-3" />
          </span>
        )}
      </button>
    );
  }
);
Tag.displayName = "Tag";

PrimitiveRegistry.register({
  id: "primitive-tag",
  name: "Tag",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Interactive visual indicator supporting selection and dismissal.",
  dependencies: ["class-variance-authority", "IconRegistry"],
  tokens: ["bg-primary", "bg-secondary", "ring-primary"],
  accessibility: ["keyboard focus", "screen readers", "button role", "aria-label"],
  responsive: true,
  motion: ["hover", "focus"],
  component: Tag,
});

export { Tag };
