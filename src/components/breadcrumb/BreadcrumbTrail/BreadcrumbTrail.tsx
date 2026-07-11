"use client";

import React from "react";
import { BreadcrumbTrailProps } from "./BreadcrumbTrail.types";
import { ComponentRegistry } from "@/registry";

export function BreadcrumbTrail({ children, className = "" }: BreadcrumbTrailProps) {
  return <div className={`flex items-center flex-wrap min-w-0 ${className}`}>{children}</div>;
}

ComponentRegistry.register({
  id: "breadcrumb-trail",
  name: "BreadcrumbTrail",
  category: "breadcrumb" as any,
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
