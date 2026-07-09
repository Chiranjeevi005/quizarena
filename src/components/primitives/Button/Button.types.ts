import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        danger: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        success: "bg-green-600 text-white shadow-sm hover:bg-green-600/90",
        warning: "bg-amber-500 text-white shadow-sm hover:bg-amber-500/90",
        info: "bg-blue-500 text-white shadow-sm hover:bg-blue-500/90",
        link: "text-primary underline-offset-4 hover:underline",
        text: "bg-transparent text-foreground hover:bg-accent/50",
        icon: "h-9 w-9 p-0",
        toolbar:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground rounded-sm",
        sidebar:
          "bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground justify-start",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      state: {
        idle: "",
        loading: "pointer-events-none opacity-70",
        success: "",
        error: "",
        disabled: "pointer-events-none opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      state: "idle",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
