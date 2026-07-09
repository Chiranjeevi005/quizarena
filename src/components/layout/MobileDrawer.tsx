"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "@/providers/LayoutProvider";
import { NavigationItem } from "@/types";
import { Icon } from "@/icons/Icon";
import { NavigationTree } from "./NavigationTree";
import { ComponentRegistry } from "@/registry";

interface MobileDrawerProps {
  items: NavigationItem[];
  user: any;
  settingsHref?: string;
  roleLabel?: string;
}

export function MobileDrawer({
  items,
  user,
  settingsHref = "/settings",
  roleLabel,
}: MobileDrawerProps) {
  const router = useRouter();
  const { isMobileDrawerOpen, setMobileDrawerOpen, responsiveState } = useLayout();

  // Do not render mobile drawer on desktop
  if (responsiveState === "desktop") return null;

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
    <AnimatePresence>
      {isMobileDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <motion.div
            id="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[300px] bg-white z-50 shadow-2xl md:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <Link
                href="/dashboard/home"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/logo-header.png"
                  alt="QuizArena"
                  width={160}
                  height={36}
                  className="transition-all duration-220"
                  style={{ width: 160, height: "auto", objectFit: "contain" }}
                  unoptimized
                />
              </Link>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-navy transition-colors"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile */}
            <div className="px-5 py-5 border-b border-gray-100 shrink-0">
              <Link
                href="/profile"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center gap-4 group transition-all"
              >
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={52}
                    height={52}
                    className="rounded-full object-cover w-[52px] h-[52px]"
                  />
                ) : (
                  <div className="w-[52px] h-[52px] bg-primary flex items-center justify-center rounded-full text-white font-bold text-lg">
                    {getInitials(user?.name)}
                  </div>
                )}
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
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
              <NavigationTree
                items={items}
                onItemClick={() => setMobileDrawerOpen(false)}
                userRole={user?.role}
              />
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 shrink-0 space-y-1">
              <Link
                href={settingsHref}
                onClick={() => setMobileDrawerOpen(false)}
                onMouseEnter={() => router.prefetch(settingsHref)}
                className="group flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-xl text-gray-500 hover:bg-gray-50 hover:text-navy transition-all duration-200 w-full"
              >
                <Icon
                  name="Settings"
                  className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300"
                />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="group flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-xl text-gray-500 hover:bg-red-50/50 hover:text-red-600 transition-all duration-200 w-full"
              >
                <Icon
                  name="LogOut"
                  className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300"
                />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

ComponentRegistry.register({
  id: "layout-mobile-drawer",
  name: "MobileDrawer",
  category: "layout",
  version: "1.0.0",
  status: "stable",
  owner: "workspace-architecture",
});
