import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/utilities";
import { PrimitiveRegistry } from "@/registry";
import { Icon } from "@/icons";
import { AvatarProps, avatarVariants } from "./Avatar.types";

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, src, alt, initials, iconName, pattern, status, ...props }, ref) => {
    // Status color mapping
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-muted-foreground",
      busy: "bg-destructive",
      away: "bg-amber-500",
    };

    return (
      <div className="relative inline-block">
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(avatarVariants({ size, className }))}
          {...props}
        >
          {src && (
            <AvatarPrimitive.Image
              src={src}
              alt={alt || "Avatar"}
              className="aspect-square h-full w-full object-cover"
            />
          )}
          <AvatarPrimitive.Fallback
            className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground"
            delayMs={src ? 600 : 0}
          >
            {initials ? (
              <span className="font-medium uppercase">{initials.substring(0, 2)}</span>
            ) : iconName ? (
              <Icon name={iconName} className="h-1/2 w-1/2" />
            ) : pattern ? (
              <div
                className="h-full w-full opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
            ) : (
              <Icon name="User" className="h-1/2 w-1/2" />
            )}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
              size === "sm"
                ? "h-2 w-2"
                : size === "lg"
                  ? "h-3.5 w-3.5"
                  : size === "xl"
                    ? "h-4 w-4"
                    : "h-3 w-3",
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

PrimitiveRegistry.register({
  id: "primitive-avatar",
  name: "Avatar",
  version: "1.0.0",
  registryVersion: "1.0.0",
  status: "stable",
  category: "primitives",
  description:
    "User profile picture with comprehensive fallbacks (Initials, Icon, Pattern, Empty) and status indicators.",
  dependencies: ["@radix-ui/react-avatar", "class-variance-authority", "IconRegistry"],
  tokens: ["bg-muted", "text-muted-foreground", "bg-green-500", "bg-destructive", "bg-amber-500"],
  accessibility: ["image alt text", "delay loading", "aria-label"],
  responsive: true,
  motion: ["none"],
  component: Avatar,
});

export { Avatar };
