import { InputHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ValidationState } from "@/types";

export const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      validationState: {
        idle: "",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-amber-500 focus-visible:ring-amber-500",
        error: "border-destructive focus-visible:ring-destructive",
        info: "border-blue-500 focus-visible:ring-blue-500",
      },
    },
    defaultVariants: {
      validationState: "idle",
    },
  }
);

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "prefix">,
    VariantProps<typeof inputVariants> {
  isLoading?: boolean;
}

export type InputWrapperProps = HTMLAttributes<HTMLDivElement>;
export type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export type InputDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type InputHintProps = HTMLAttributes<HTMLParagraphElement>;
export interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  validationState?: ValidationState;
}
export type InputPrefixProps = HTMLAttributes<HTMLDivElement>;
export type InputSuffixProps = HTMLAttributes<HTMLDivElement>;
export type InputLeftAddonProps = HTMLAttributes<HTMLDivElement>;
export type InputRightAddonProps = HTMLAttributes<HTMLDivElement>;
export type InputCounterProps = HTMLAttributes<HTMLSpanElement> & { current: number; max?: number };
