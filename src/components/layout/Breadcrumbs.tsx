"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/icons/Icon";
import { ComponentRegistry } from "@/registry";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  segments?: BreadcrumbSegment[];
}

export function Breadcrumbs({ segments }: BreadcrumbsProps) {
  const pathname = usePathname();

  // If no segments provided, try to auto-generate from pathname
  // (In a real enterprise app, we'd use a breadcrumb registry or routing context)
  const autoSegments = React.useMemo(() => {
    if (segments) return segments;

    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      return { label, href };
    });
  }, [pathname, segments]);

  if (!autoSegments || autoSegments.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-gray-500 font-medium mb-1"
    >
      {autoSegments.map((segment, index) => {
        const isLast = index === autoSegments.length - 1;

        return (
          <React.Fragment key={segment.href || segment.label}>
            {index > 0 && (
              <Icon name="ChevronRight" className="w-4 h-4 mx-1.5 text-gray-400 shrink-0" />
            )}

            {isLast || !segment.href ? (
              <span className="text-navy font-semibold truncate" aria-current="page">
                {segment.label}
              </span>
            ) : (
              <Link href={segment.href} className="hover:text-primary transition-colors truncate">
                {segment.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

ComponentRegistry.register({
  id: "layout-breadcrumbs",
  name: "Breadcrumbs",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
