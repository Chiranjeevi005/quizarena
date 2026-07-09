import React from "react";
import { IconRegistry } from "./IconRegistry";
import { LucideProps } from "lucide-react";
import { cn } from "@/utilities";

export interface IconProps extends Omit<LucideProps, "name"> {
  name: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = 24, ...props }, ref) => {
    const Component = IconRegistry.get(name);

    if (!Component) {
      console.warn(`[Icon] Icon "${name}" not found in IconRegistry.`);
      return null;
    }

    return <Component ref={ref} size={size} className={cn("shrink-0", className)} {...props} />;
  }
);
Icon.displayName = "Icon";
