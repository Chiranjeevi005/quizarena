"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useLayout } from "@/providers/LayoutProvider";
import { NavigationItem } from "@/types";
import { Icon } from "@/icons/Icon";
import { NavigationTree } from "./NavigationTree";
import { ComponentRegistry } from "@/registry";
import { AvatarIdentity } from "@/shared/ui/AvatarIdentity";

interface SidebarProps {
  items: NavigationItem[];
  user: any; // Using any for now, should ideally be typed
  userStatsNode?: React.ReactNode;
  settingsHref?: string;
  roleLabel?: string;
}

export function Sidebar({
  items,
  user,
  userStatsNode,
  settingsHref = "/settings",
  roleLabel,
}: SidebarProps) {
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar, responsiveState } = useLayout();

  // Do not render desktop sidebar on mobile
  if (responsiveState === "mobile") return null;

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 z-30 transition-[width] duration-220 ease-out ${
        isSidebarCollapsed ? "w-20" : "w-[280px]"
      }`}
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100 shrink-0 relative group">
        <Link
          href="/dashboard/home"
          className="flex items-center justify-center gap-2.5 w-full h-full"
        >
          {!isSidebarCollapsed ? (
            <Image
              src="/logo-header.png"
              alt="QuizArena"
              width={160}
              height={36}
              className="transition-all duration-220"
              style={{ width: 160, height: "auto", objectFit: "contain" }}
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">Q</span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-navy hover:border-gray-300 transition-colors opacity-0 group-hover:opacity-100 z-10"
        >
          <Icon
            name={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
            className="w-3.5 h-3.5"
          />
        </button>
      </div>

      {/* IDENTITY SECTION */}
      <div
        className={`p-5 border-b border-gray-100 shrink-0 ${isSidebarCollapsed ? "flex justify-center px-2" : ""}`}
      >
        <Link href="/profile" className="flex items-center gap-4 group transition-all w-full">
          <AvatarIdentity
            name={user?.name}
            username={user?.username}
            image={user?.image}
            examCategory={user?.examCategory}
            rankTier="BRONZE"
            size={isSidebarCollapsed ? 40 : 52}
            className="group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
          />
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy truncate group-hover:text-primary transition-colors">
                {user?.name || "User"}
              </p>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs text-gray-500 truncate">
                  @{user?.username || "aspirant"}
                </span>
                {roleLabel && (
                  <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">
                    {roleLabel}
                  </span>
                )}
              </div>
              {userStatsNode}
            </div>
          )}
        </Link>
      </div>

      {/* NAVIGATION TREE */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <NavigationTree items={items} collapsed={isSidebarCollapsed} userRole={user?.role} />
      </nav>

      {/* BOTTOM UTILITY SECTION */}
      <div className="shrink-0 border-t border-gray-100 mt-auto">
        <div className="p-4 space-y-1">
          <Link
            href={settingsHref}
            onMouseEnter={() => router.prefetch(settingsHref)}
            className={`group flex items-center gap-3 py-3 min-h-[48px] rounded-xl text-gray-500 hover:bg-gray-50 hover:text-navy transition-all duration-200 w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "px-4"
            }`}
            title={isSidebarCollapsed ? "Settings" : undefined}
          >
            <Icon
              name="Settings"
              className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300"
            />
            {!isSidebarCollapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`group flex items-center gap-3 py-3 min-h-[48px] rounded-xl text-gray-500 hover:bg-red-50/50 hover:text-red-600 transition-all duration-200 w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "px-4"
            }`}
            title={isSidebarCollapsed ? "Sign Out" : undefined}
          >
            <Icon
              name="LogOut"
              className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300"
            />
            {!isSidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

ComponentRegistry.register({
  id: "layout-sidebar",
  name: "Sidebar",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
