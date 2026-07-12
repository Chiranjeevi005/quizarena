"use client";

import React from "react";
import {
  QuizSessionProvider,
  QuizSession,
  SessionWorkspace,
  SessionCanvas,
  SessionViewport,
  SessionSidebar,
  SessionCreated,
  SessionReady,
  SessionActive,
  SessionPaused,
  SessionReview,
  SessionSubmitting,
  SessionCompleted,
  SessionExpired,
  SessionAbandoned,
  SessionCompletionMeter,
  SessionReadinessPanel,
  SessionWarningPanel,
  SessionSuggestionPanel,
  SessionInformation,
  SessionStatistics,
  SessionProgressSummary,
  SessionQuestionCounter,
} from "@/features/quizzes";

export default function QuizSessionPlayground() {
  const lifecycles = [
    { name: "Created", Component: SessionCreated, color: "border-slate-200" },
    { name: "Ready", Component: SessionReady, color: "border-blue-200" },
    { name: "Active", Component: SessionActive, color: "border-green-200 ring-2 ring-green-500" },
    { name: "Paused", Component: SessionPaused, color: "border-yellow-200" },
    { name: "Review", Component: SessionReview, color: "border-purple-200" },
    { name: "Submitting", Component: SessionSubmitting, color: "border-orange-200" },
    { name: "Completed", Component: SessionCompleted, color: "border-green-400" },
    { name: "Expired", Component: SessionExpired, color: "border-red-200" },
    { name: "Abandoned", Component: SessionAbandoned, color: "border-slate-400" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border bg-card p-4">
        <h1 className="text-xl font-bold">Enterprise Quiz Session Foundation</h1>
        <p className="text-xs text-muted-foreground mt-1">
          FS-06.1 Immutable Presentation Architecture
        </p>
      </div>

      <div className="flex-1 p-6 space-y-12">
        {/* Lifecycle Gallery */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Lifecycle States (Visual Orchestration Only)
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {lifecycles.map((lc) => (
              <div
                key={lc.name}
                className={`border rounded-lg bg-card shadow-sm p-4 h-48 flex flex-col ${lc.color}`}
              >
                <div className="text-sm font-bold uppercase text-muted-foreground mb-4 border-b pb-2">
                  {lc.name}
                </div>
                <div className="flex-1 flex items-center justify-center bg-muted/5 rounded border border-dashed">
                  <lc.Component className="text-center p-4">
                    <span className="text-xs font-medium">Rendered: {lc.name} Shell</span>
                  </lc.Component>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Layout Variants Gallery */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Session Layouts (Structural Shells)</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Standard Layout */}
            <div className="border rounded-lg bg-card shadow-sm h-64 flex flex-col overflow-hidden">
              <div className="text-xs font-bold uppercase p-2 border-b bg-muted/10">
                Standard Layout
              </div>
              <SessionWorkspace className="flex-1 flex flex-col">
                <div className="h-8 border-b bg-muted/20 flex items-center px-2 text-[10px]">
                  Header
                </div>
                <div className="flex-1 flex">
                  <SessionCanvas className="flex-1 border-r flex flex-col bg-background relative">
                    <SessionViewport className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
                      Viewport (QUESTION VIEW)
                    </SessionViewport>
                  </SessionCanvas>
                  <SessionSidebar className="w-24 bg-muted/5 flex flex-col">
                    <div className="h-full border-dashed border p-2 text-[10px] text-center flex items-center">
                      Sidebar Content
                    </div>
                  </SessionSidebar>
                </div>
                <div className="h-8 border-t bg-muted/20 flex items-center px-2 text-[10px]">
                  Footer
                </div>
              </SessionWorkspace>
            </div>

            {/* Focused Layout */}
            <div className="border rounded-lg bg-card shadow-sm h-64 flex flex-col overflow-hidden ring-2 ring-primary">
              <div className="text-xs font-bold uppercase p-2 border-b bg-muted/10">
                Focused Layout
              </div>
              <SessionWorkspace className="flex-1 flex flex-col">
                <div className="flex-1 flex">
                  <SessionCanvas className="flex-1 bg-background relative">
                    <SessionViewport className="h-full flex items-center justify-center text-xs text-muted-foreground">
                      Viewport (QUESTION VIEW) - No Distractions
                    </SessionViewport>
                  </SessionCanvas>
                </div>
                <div className="h-10 border-t bg-card flex justify-center items-center px-4 text-[10px] gap-4">
                  <button className="border px-2 py-1 rounded">Previous</button>
                  <span>Question 5 of 20</span>
                  <button className="border px-2 py-1 rounded bg-primary text-primary-foreground">
                    Next
                  </button>
                </div>
              </SessionWorkspace>
            </div>

            {/* Split Layout */}
            <div className="border rounded-lg bg-card shadow-sm h-64 flex flex-col overflow-hidden">
              <div className="text-xs font-bold uppercase p-2 border-b bg-muted/10">
                Split Layout
              </div>
              <SessionWorkspace className="flex-1 flex flex-col">
                <div className="flex-1 flex">
                  <div className="w-1/2 border-r bg-muted/10 flex items-center justify-center p-4">
                    <div className="border-2 border-dashed border-muted-foreground/30 w-full h-full rounded flex items-center justify-center text-xs">
                      Reference Material
                    </div>
                  </div>
                  <SessionCanvas className="w-1/2 bg-background relative">
                    <SessionViewport className="h-full flex items-center justify-center text-xs text-muted-foreground">
                      Viewport
                    </SessionViewport>
                  </SessionCanvas>
                </div>
              </SessionWorkspace>
            </div>
          </div>
        </section>

        {/* Completion & Metadata Gallery */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Metadata & Completion Engine</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg bg-card shadow-sm p-4 space-y-4">
              <div className="text-xs font-bold uppercase text-muted-foreground border-b pb-2">
                Session Metadata
              </div>

              <SessionInformation className="p-3 border rounded bg-muted/5">
                <h3 className="font-semibold text-sm">Midterm Assessment</h3>
                <p className="text-xs text-muted-foreground">Software Engineering 101</p>
              </SessionInformation>

              <div className="grid grid-cols-2 gap-4">
                <SessionStatistics className="p-3 border rounded bg-muted/5">
                  <div className="text-[10px] uppercase text-muted-foreground">Time Elapsed</div>
                  <div className="font-mono text-lg">14:22</div>
                </SessionStatistics>
                <SessionQuestionCounter className="p-3 border rounded bg-muted/5">
                  <div className="text-[10px] uppercase text-muted-foreground">Questions</div>
                  <div className="font-medium text-lg">12 / 30</div>
                </SessionQuestionCounter>
              </div>
            </div>

            <div className="border rounded-lg bg-card shadow-sm p-4 space-y-4">
              <div className="text-xs font-bold uppercase text-muted-foreground border-b pb-2">
                Completion Engine (Review View)
              </div>

              <SessionProgressSummary className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Session Completion</span>
                  <span className="text-primary">80%</span>
                </div>
                <SessionCompletionMeter className="h-2 w-full bg-muted rounded overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "80%" }}></div>
                </SessionCompletionMeter>
              </SessionProgressSummary>

              <SessionReadinessPanel className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <div className="flex gap-2 text-sm text-green-700">
                  <span className="font-bold">✓</span>
                  <div>
                    <strong>Ready for Submission</strong>
                    <p className="text-xs mt-1">All mandatory questions answered.</p>
                  </div>
                </div>
              </SessionReadinessPanel>

              <SessionWarningPanel className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <div className="flex gap-2 text-sm text-orange-700">
                  <span className="font-bold">⚠</span>
                  <div>
                    <strong>3 Flagged Questions</strong>
                    <p className="text-xs mt-1">You have flagged questions for review.</p>
                  </div>
                </div>
              </SessionWarningPanel>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
