"use client";

import React, { useState } from "react";
import { BreadcrumbProvider } from "@/providers/BreadcrumbProvider";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { BreadcrumbTrail } from "@/components/breadcrumb/BreadcrumbTrail";
import { BreadcrumbItem } from "@/components/breadcrumb/BreadcrumbItem";
import { BreadcrumbCurrent } from "@/components/breadcrumb/BreadcrumbCurrent";
import { BreadcrumbSeparator } from "@/components/breadcrumb/BreadcrumbSeparator";
import { BreadcrumbOverflow } from "@/components/breadcrumb/BreadcrumbOverflow";
import { Icon } from "@/icons/Icon";

export default function BreadcrumbPlayground() {
  const [isCompact, setIsCompact] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [simulateMobile, setSimulateMobile] = useState(false);

  // Generate 100 items for the stress test
  const stressTestItems = Array.from({ length: 100 }).map((_, i) => `Folder ${i + 1}`);

  return (
    <div
      className={`min-h-screen bg-gray-50 flex flex-col font-sans ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Playground Controls */}
      <div className="bg-white border-b border-gray-200 p-4 shrink-0 shadow-sm z-50 sticky top-0">
        <h1 className="text-xl font-bold mb-4 text-navy">Breadcrumb Platform Playground</h1>
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCompact}
              onChange={(e) => setIsCompact(e.target.checked)}
            />
            <span className="text-sm">Compact Mode</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isRTL} onChange={(e) => setIsRTL(e.target.checked)} />
            <span className="text-sm">RTL Mode</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={simulateMobile}
              onChange={(e) => setSimulateMobile(e.target.checked)}
            />
            <span className="text-sm">Simulate Mobile View (320px)</span>
          </label>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8 space-y-12">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            1. Standard Breadcrumb
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
          >
            <BreadcrumbProvider defaultCompactMode={isCompact}>
              <Breadcrumb>
                <BreadcrumbTrail>
                  <BreadcrumbItem label="Home" icon="Home" />
                  <BreadcrumbSeparator />
                  <BreadcrumbItem label="Projects" />
                  <BreadcrumbSeparator />
                  <BreadcrumbCurrent label="QuizArena" />
                </BreadcrumbTrail>
              </Breadcrumb>
            </BreadcrumbProvider>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            2. Overflow Example
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${simulateMobile ? "max-w-[320px] mx-auto" : "max-w-[800px]"}`}
          >
            <BreadcrumbProvider defaultCompactMode={isCompact}>
              <Breadcrumb>
                <BreadcrumbTrail>
                  <BreadcrumbItem label="Home" />
                  <BreadcrumbSeparator />
                  <BreadcrumbItem label="Workspaces" />
                  <BreadcrumbSeparator variant="slash" />
                  <BreadcrumbOverflow
                    collapsedRenderer={
                      <span className="font-bold tracking-widest text-gray-400">•••</span>
                    }
                  />
                  <BreadcrumbSeparator variant="slash" />
                  <BreadcrumbItem label="Engineering" />
                  <BreadcrumbSeparator variant="slash" />
                  <BreadcrumbCurrent label="Frontend Architecture" />
                </BreadcrumbTrail>
              </Breadcrumb>
            </BreadcrumbProvider>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            3. Long Truncated Breadcrumb
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
          >
            <BreadcrumbProvider defaultCompactMode={isCompact}>
              <Breadcrumb>
                <BreadcrumbTrail>
                  <BreadcrumbItem label="Root Directory" />
                  <BreadcrumbSeparator />
                  <BreadcrumbItem
                    label="A Very Long Folder Name That Should Definitely Truncate Before It Ruins The Layout"
                    truncated
                  />
                  <BreadcrumbSeparator />
                  <BreadcrumbCurrent
                    label="Another Ridiculously Long Current Page Name That Should Truncate Too"
                    truncated
                  />
                </BreadcrumbTrail>
              </Breadcrumb>
            </BreadcrumbProvider>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            4. Stress Test (100 Items)
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${simulateMobile ? "max-w-[320px] mx-auto overflow-hidden" : "w-full overflow-hidden"}`}
          >
            <BreadcrumbProvider defaultCompactMode={isCompact}>
              <Breadcrumb>
                <BreadcrumbTrail>
                  <BreadcrumbItem label="Root" />
                  <BreadcrumbSeparator />
                  <BreadcrumbOverflow />
                  <BreadcrumbSeparator />
                  {stressTestItems.slice(95).map((item, index) => (
                    <React.Fragment key={item}>
                      <BreadcrumbItem label={item} />
                      <BreadcrumbSeparator />
                    </React.Fragment>
                  ))}
                  <BreadcrumbCurrent label="Final Destination" />
                </BreadcrumbTrail>
              </Breadcrumb>
            </BreadcrumbProvider>
          </div>
        </section>
      </div>
    </div>
  );
}
