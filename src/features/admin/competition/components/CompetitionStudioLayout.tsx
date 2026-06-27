"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CompetitionStudioLayout({
  children,
  competitionId,
  title,
}: {
  children: React.ReactNode;
  competitionId?: string;
  title?: string;
}) {
  const pathname = usePathname();

  const tabs = competitionId
    ? [
        { label: "Overview", href: ROUTES.ADMIN.COMPETITION_OVERVIEW(competitionId) },
        { label: "Assessment Builder", href: ROUTES.ADMIN.COMPETITION_BUILDER(competitionId) },
        { label: "Rules & Settings", href: ROUTES.ADMIN.COMPETITION_RULES(competitionId) },
        { label: "Publish", href: ROUTES.ADMIN.COMPETITION_PUBLISH(competitionId) },
        { label: "Analytics", href: ROUTES.ADMIN.COMPETITION_ANALYTICS(competitionId) },
        { label: "History", href: ROUTES.ADMIN.COMPETITION_HISTORY(competitionId) },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen pb-12">
      {/* Header Section */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
        {/* Subtle decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-orange-400 to-orange-600" />

        <div className="px-6 py-8 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-navy">
                {title || "Competition Studio"}
              </h1>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
                Manage your assessment products and experiences. Configure rules, manage
                participants, and monitor analytics.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {competitionId && (
            <div className="mt-8 border-b border-gray-100">
              <nav
                className="-mb-px flex space-x-6 overflow-x-auto scrollbar-hide"
                aria-label="Tabs"
              >
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href;
                  return (
                    <Link
                      key={tab.label}
                      href={tab.href}
                      className={cn(
                        "relative whitespace-nowrap py-4 px-2 text-sm font-semibold transition-colors",
                        isActive ? "text-orange-600" : "text-gray-500 hover:text-navy"
                      )}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.div
                          layoutId="competition-tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
