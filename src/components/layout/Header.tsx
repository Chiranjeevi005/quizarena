"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLayout } from "@/providers/LayoutProvider";
import { ComponentRegistry } from "@/registry";
import { AvatarIdentity } from "@/shared/ui/AvatarIdentity";
import { Breadcrumbs } from "./Breadcrumbs";

interface HeaderProps {
  user: any;
  breadcrumbs?: React.ReactNode;
}

export function Header({ user, breadcrumbs }: HeaderProps) {
  const { toggleMobileDrawer, responsiveState } = useLayout();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile Header */}
      {responsiveState !== "desktop" && (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={toggleMobileDrawer}
            className="p-1.5 group flex flex-col gap-[4.5px] items-start justify-center w-9 h-9 text-navy hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <span className="w-5 h-[2px] bg-current rounded-full transition-all group-hover:w-5"></span>
            <span className="w-3.5 h-[2px] bg-current rounded-full transition-all group-hover:w-5"></span>
            <span className="w-5 h-[2px] bg-current rounded-full transition-all group-hover:w-5"></span>
          </button>

          <Link
            href="/dashboard/home"
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo-header.png"
              alt="QuizArena"
              width={200}
              height={48}
              className="h-12 w-auto scale-[1.35] sm:scale-[1.4] origin-center object-contain"
              priority
              unoptimized
            />
          </Link>

          <Link
            href="/profile"
            className="shrink-0 group hover:opacity-80 transition-opacity mt-1 mr-2"
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={36}
                height={36}
                className="rounded-full object-cover w-9 h-9 shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-full text-white font-bold text-sm shadow-sm">
                {getInitials(user?.name)}
              </div>
            )}
          </Link>
        </header>
      )}

      {/* Desktop Breadcrumb Area */}
      {responsiveState === "desktop" && breadcrumbs && <div className="mb-4">{breadcrumbs}</div>}
    </>
  );
}

ComponentRegistry.register({
  id: "layout-header",
  name: "Header",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
