import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
} from "./Tooltip.types";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Adding an alias for TooltipGroup as requested by architecture
const TooltipGroup = TooltipProvider;

PrimitiveRegistry.register({
  id: "primitive-tooltip",
  name: "Tooltip",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description: "Accessible tooltip primitive with enter/exit animations and delay grouping.",
  dependencies: ["@radix-ui/react-tooltip"],
  tokens: ["bg-popover", "text-popover-foreground", "border-border"],
  accessibility: ["escape handling", "keyboard focus", "screen readers"],
  responsive: true,
  motion: ["fade-in", "zoom-in", "slide-in"],
  component: Tooltip,
});

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipGroup };
