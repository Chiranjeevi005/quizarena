"use client";

import React, { useState } from "react";
import { ToolbarProvider } from "@/providers/ToolbarProvider";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { ToolbarGroup } from "@/components/toolbar/ToolbarGroup";
import { ToolbarAction } from "@/components/toolbar/ToolbarAction";
import { ToolbarOverflow } from "@/components/toolbar/ToolbarOverflow";
import { ActionBar } from "@/components/toolbar/ActionBar";
import { CommandBar } from "@/components/toolbar/CommandBar";
import { ToolbarEmptyState } from "@/components/toolbar/ToolbarEmptyState";
import { ToolbarVariant, ToolbarOrientation } from "@/toolbar/ToolbarTypes";

export default function ToolbarPlayground() {
  const [compactMode, setCompactMode] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [simulateMobile, setSimulateMobile] = useState(false);

  const stressGroups = Array.from({ length: 50 }).map((_, i) => `G${i + 1}`);
  const stressActions = Array.from({ length: 4 }).map((_, i) => `Action ${i + 1}`);

  return (
    <div
      className={`min-h-screen bg-gray-50 flex flex-col font-sans ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 p-4 shrink-0 shadow-sm z-50 sticky top-0">
        <h1 className="text-xl font-bold mb-4 text-navy">Toolbar & Command Platform Playground</h1>
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={(e) => setCompactMode(e.target.checked)}
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

      <div className="flex-1 overflow-auto p-4 md:p-8 space-y-12">
        {/* 1. Variants */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            1. Toolbar Variants
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs mb-2 text-gray-400">Default</h3>
              <div
                className={`bg-gray-100 rounded-xl overflow-hidden ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
              >
                <ToolbarProvider defaultCompactMode={compactMode}>
                  <Toolbar variant="default">
                    <ToolbarGroup id="g1" divider>
                      <ToolbarAction icon="Plus" label="New" />
                      <ToolbarAction icon="FolderPlus" />
                    </ToolbarGroup>
                    <ToolbarGroup id="g2" label="Edit">
                      <ToolbarAction icon="Copy" disabled />
                      <ToolbarAction icon="Trash2" danger />
                    </ToolbarGroup>
                    <div className="flex-1" />
                    <ToolbarOverflow>
                      <div className="flex flex-col p-2">
                        <ToolbarAction
                          icon="Settings"
                          label="Preferences"
                          className="w-full justify-start"
                        />
                      </div>
                    </ToolbarOverflow>
                  </Toolbar>
                </ToolbarProvider>
              </div>
            </div>

            <div>
              <h3 className="text-xs mb-2 text-gray-400">Dense</h3>
              <div
                className={`bg-gray-100 rounded-xl overflow-hidden ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
              >
                <ToolbarProvider defaultCompactMode={compactMode}>
                  <Toolbar variant="dense">
                    <ToolbarAction icon="Play" label="Run" />
                    <ToolbarAction icon="Square" label="Stop" disabled />
                  </Toolbar>
                </ToolbarProvider>
              </div>
            </div>

            <div>
              <h3 className="text-xs mb-2 text-gray-400">Floating</h3>
              <div className="h-32 bg-gray-100 rounded-xl relative overflow-auto pt-4">
                <div className="h-[500px]">
                  <ToolbarProvider defaultCompactMode={compactMode}>
                    <Toolbar variant="floating">
                      <ToolbarAction icon="Type" />
                      <ToolbarAction icon="Image" />
                      <ToolbarAction icon="Link" active />
                    </Toolbar>
                  </ToolbarProvider>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Action Bar */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            2. Action Bar
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl p-4 ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
          >
            <ToolbarProvider defaultCompactMode={compactMode}>
              <ActionBar
                leading={
                  <ToolbarGroup id="leading">
                    <ToolbarAction label="Cancel" />
                  </ToolbarGroup>
                }
                center={<span className="text-sm font-semibold">Editing Settings</span>}
                trailing={
                  <ToolbarGroup id="trailing">
                    <ToolbarAction label="Save" active />
                  </ToolbarGroup>
                }
              />
            </ToolbarProvider>
          </div>
        </section>

        {/* 3. Command Bar */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            3. Command Bar States
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl p-8 space-y-8 ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
          >
            <ToolbarProvider defaultCompactMode={compactMode}>
              <CommandBar state="idle" />
              <CommandBar
                state="focused"
                resultsSlot={<div className="p-4 text-center">Results Mockup</div>}
              />
              <CommandBar state="loading" />
              <CommandBar
                state="error"
                inputSlot={
                  <input
                    type="text"
                    defaultValue="Invalid command"
                    className="w-full text-red-600 bg-transparent outline-none"
                  />
                }
              />
              <CommandBar state="disabled" />
            </ToolbarProvider>
          </div>
        </section>

        {/* 4. Empty States */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            4. Empty States
          </h2>
          <div
            className={`grid gap-4 ${simulateMobile ? "grid-cols-1 max-w-[320px] mx-auto" : "grid-cols-2"}`}
          >
            <ToolbarProvider defaultCompactMode={compactMode}>
              <ToolbarEmptyState variant="no-actions" />
              <ToolbarEmptyState variant="loading" />
              <ToolbarEmptyState variant="permission" />
              <ToolbarEmptyState
                variant="workspace"
                actionPlaceholder={<ToolbarAction label="Select" active />}
              />
            </ToolbarProvider>
          </div>
        </section>

        {/* 5. Stress Test */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            5. Stress Test (50 Groups, 200 Actions)
          </h2>
          <div
            className={`bg-white border border-gray-200 rounded-xl overflow-x-auto ${simulateMobile ? "max-w-[320px] mx-auto" : "w-full"}`}
          >
            <ToolbarProvider defaultCompactMode={compactMode}>
              <Toolbar variant="default" className="min-w-max">
                {stressGroups.map((gLabel) => (
                  <ToolbarGroup key={gLabel} id={gLabel} label={gLabel} divider>
                    {stressActions.map((aLabel) => (
                      <ToolbarAction key={`${gLabel}-${aLabel}`} icon="Command" label={aLabel} />
                    ))}
                  </ToolbarGroup>
                ))}
              </Toolbar>
            </ToolbarProvider>
          </div>
        </section>
      </div>
    </div>
  );
}
