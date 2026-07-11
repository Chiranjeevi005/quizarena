import React from "react";

export type BreadcrumbSeparatorVariant = "chevron" | "slash" | "dot";

export interface BreadcrumbSeparatorProps {
  variant?: BreadcrumbSeparatorVariant;
  className?: string;
}
