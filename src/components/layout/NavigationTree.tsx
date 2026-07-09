"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavigationItem } from "@/types";
import { Icon } from "@/icons/Icon";
import { ComponentRegistry } from "@/registry";

interface NavigationTreeProps {
  items: NavigationItem[];
  collapsed?: boolean;
  onItemClick?: () => void;
  userRole?: string; // e.g., 'ADMIN', 'USER', 'MODERATOR', 'SUPER_ADMIN'
}

export function NavigationTree({
  items,
  collapsed = false,
  onItemClick,
  userRole,
}: NavigationTreeProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-1">
      {items.map((item, index) => {
        const showGroupHeader =
          item.group && (index === 0 || items[index - 1].group !== item.group);

        const isActive = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <div key={item.id}>
            {showGroupHeader && !collapsed && (
              <div className="px-4 py-2 mt-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                {item.group}
              </div>
            )}
            <Link
              href={item.href}
              onClick={onItemClick}
              onMouseEnter={() => router.prefetch(item.href)}
              className={`group relative flex items-center gap-3 py-3 min-h-[48px] rounded-xl transition-all duration-200 ${
                collapsed ? "justify-center px-0 mx-2" : "px-4"
              } ${
                isActive
                  ? "bg-orange-50 text-orange-600 shadow-[inset_0_2px_12px_rgba(249,115,22,0.06)]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-navy"
              }`}
              title={collapsed ? item.title : undefined}
            >
              {isActive && !collapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full" />
              )}

              <Icon
                name={item.icon}
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-orange-500" : ""
                } ${!isActive && userRole !== "USER" && item.href.includes("dashboard") ? "text-amber-500" : ""}`}
              />

              {!collapsed && (
                <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.title}
                </span>
              )}

              {!collapsed && item.badge && (
                <span className="ml-auto bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {item.badge}
                </span>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

ComponentRegistry.register({
  id: "layout-navigation-tree",
  name: "NavigationTree",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
