"use client";

import React, { useState } from "react";
import {
  QuizBuilderProvider,
  QuizBuilderWorkspace,
  QuizBuilderHeader,
  QuizBuilderFooter,
  QuizBuilderToolbar,
  QuizCanvasRegion,
  QuestionBrowserRegion,
  QuizOutline,
  OutlineItem,
  QuizPreview,
  QuestionPreviewCard,
  QuizInspector,
  QuizStatisticsPanel,
  QuizMetadataPanel,
  QuizCompletionEngine,
  CompletionMeter,
  QualityChecklist,
} from "@/features/quizzes";
import {
  QuestionCard,
  QuestionCardHeader,
  QuestionTitle,
  QuestionCardBody,
  QuestionStatement,
} from "@/features/questions";

export default function QuizBuilderPlayground() {
  const [tab, setTab] = useState<"BUILDER" | "STRESS">("BUILDER");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border bg-card p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Enterprise Quiz Builder Platform</h1>
          <p className="text-xs text-muted-foreground mt-1">FS-05 Orchestration Workspace</p>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-sm border rounded ${tab === "BUILDER" ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"}`}
            onClick={() => setTab("BUILDER")}
          >
            Playlist Builder UX
          </button>
          <button
            className={`px-3 py-1 text-sm border rounded ${tab === "STRESS" ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"}`}
            onClick={() => setTab("STRESS")}
          >
            Scale Stress Test
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        {tab === "BUILDER" && (
          <QuizBuilderProvider>
            <QuizBuilderWorkspace className="h-[850px] border rounded-lg shadow-sm flex flex-col bg-card overflow-hidden">
              <QuizBuilderHeader className="border-b p-3 flex justify-between items-center bg-muted/10">
                <div className="font-semibold text-sm">
                  Quiz Configuration: &quot;Midterm Assessment&quot;
                </div>
                <QuizBuilderToolbar className="flex gap-2">
                  <button className="px-3 py-1 text-xs border rounded bg-muted/50 hover:bg-muted">
                    Settings
                  </button>
                  <button className="px-3 py-1 text-xs border rounded bg-muted/50 hover:bg-muted">
                    Preview
                  </button>
                  <button className="px-3 py-1 text-xs border rounded bg-primary text-primary-foreground">
                    Publish
                  </button>
                </QuizBuilderToolbar>
              </QuizBuilderHeader>

              <div className="flex-1 flex overflow-hidden">
                {/* Outline (Left) */}
                <div className="w-64 border-r bg-muted/5 flex flex-col overflow-y-auto">
                  <div className="p-3 border-b text-xs font-semibold uppercase text-muted-foreground bg-muted/10">
                    Quiz Outline
                  </div>
                  <QuizOutline className="p-2 space-y-1">
                    <OutlineItem className="p-2 text-sm border rounded bg-background flex justify-between items-center shadow-sm">
                      <span className="font-medium">Section 1: Basics</span>
                      <span className="text-xs text-muted-foreground">3 Qs</span>
                    </OutlineItem>
                    <div className="pl-4 space-y-1 mt-1 border-l ml-2 border-dashed">
                      <div className="p-2 text-xs border rounded bg-card hover:bg-muted cursor-pointer flex gap-2 items-center">
                        <span className="w-4 h-4 bg-primary/10 text-primary flex items-center justify-center rounded">
                          1
                        </span>{" "}
                        What is React?
                      </div>
                      <div className="p-2 text-xs border rounded bg-card hover:bg-muted cursor-pointer flex gap-2 items-center">
                        <span className="w-4 h-4 bg-primary/10 text-primary flex items-center justify-center rounded">
                          2
                        </span>{" "}
                        State vs Props
                      </div>
                      <div className="p-2 text-xs border rounded bg-primary/10 border-primary/20 text-primary cursor-pointer flex gap-2 items-center font-medium">
                        <span className="w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center rounded">
                          3
                        </span>{" "}
                        Component Lifecycle
                      </div>
                    </div>
                  </QuizOutline>
                </div>

                {/* Main Canvas (Center) */}
                <QuizCanvasRegion className="flex-1 bg-background flex flex-col overflow-hidden relative">
                  {/* Embedded Question Browser (Top Half) */}
                  <QuestionBrowserRegion className="h-1/2 border-b flex flex-col bg-muted/5">
                    <div className="p-3 text-xs font-semibold uppercase text-muted-foreground border-b bg-card">
                      Question Bank (Compose FS-04.3)
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="flex gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Search questions..."
                          className="flex-1 border rounded p-2 text-sm"
                        />
                        <button className="border rounded px-4 py-2 text-sm bg-card hover:bg-muted">
                          Filter
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <QuestionCard className="border rounded shadow-sm bg-card opacity-50 cursor-not-allowed">
                          <QuestionCardHeader>
                            <QuestionTitle title="What is React?" />
                          </QuestionCardHeader>
                          <div className="p-2 text-xs text-center border-t bg-muted">
                            Already Added
                          </div>
                        </QuestionCard>
                        <QuestionCard className="border rounded shadow-sm bg-card hover:ring-2 ring-primary cursor-pointer">
                          <QuestionCardHeader>
                            <QuestionTitle title="Virtual DOM vs Real DOM" />
                          </QuestionCardHeader>
                          <div className="p-2 text-xs text-center border-t text-primary font-medium">
                            + Click to Add
                          </div>
                        </QuestionCard>
                      </div>
                    </div>
                  </QuestionBrowserRegion>

                  {/* Active Question Canvas (Bottom Half) */}
                  <div className="h-1/2 overflow-y-auto p-6 bg-card flex justify-center">
                    <div className="w-full max-w-2xl space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Selected Question Preview</h2>
                        <div className="text-xs text-muted-foreground">Order: #3 in Section 1</div>
                      </div>

                      <QuizPreview>
                        <QuestionPreviewCard className="border-2 border-primary/20 rounded-lg overflow-hidden shadow-sm">
                          <QuestionCard className="bg-background">
                            <QuestionCardHeader>
                              <QuestionTitle title="Component Lifecycle" />
                            </QuestionCardHeader>
                            <QuestionCardBody>
                              <QuestionStatement>
                                Explain the difference between componentDidMount and useEffect.
                              </QuestionStatement>
                            </QuestionCardBody>
                          </QuestionCard>
                        </QuestionPreviewCard>
                      </QuizPreview>

                      <div className="flex gap-2 justify-end mt-4">
                        <button className="px-3 py-1.5 text-xs border rounded text-destructive hover:bg-destructive/10">
                          Remove from Quiz
                        </button>
                        <button className="px-3 py-1.5 text-xs border rounded hover:bg-muted">
                          Move Up
                        </button>
                        <button className="px-3 py-1.5 text-xs border rounded hover:bg-muted">
                          Move Down
                        </button>
                      </div>
                    </div>
                  </div>
                </QuizCanvasRegion>

                {/* Inspector (Right) */}
                <div className="w-80 border-l bg-muted/5 flex flex-col overflow-y-auto">
                  <QuizInspector>
                    <QuizCompletionEngine className="p-4 border-b space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">Quiz Readiness</span>
                        <span className="font-bold text-primary">60%</span>
                      </div>
                      <CompletionMeter className="h-2 w-full bg-muted rounded overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "60%" }}></div>
                      </CompletionMeter>
                      <QualityChecklist className="text-xs space-y-1 mt-2">
                        <div className="flex gap-2 text-green-600">
                          ✓ At least 10 questions (15 added)
                        </div>
                        <div className="flex gap-2 text-orange-500">⚠ Missing passing criteria</div>
                      </QualityChecklist>
                    </QuizCompletionEngine>

                    <QuizStatisticsPanel className="p-4 border-b space-y-3">
                      <div className="text-xs font-semibold uppercase text-muted-foreground">
                        Composition
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Questions</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Marks</span>
                        <span className="font-medium">30</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Duration</span>
                        <span className="font-medium">45 mins</span>
                      </div>
                    </QuizStatisticsPanel>

                    <QuizMetadataPanel className="p-4 space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">
                          Randomize Order
                        </label>
                        <select className="w-full border rounded p-1.5 text-sm">
                          <option>Enabled</option>
                          <option>Disabled</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">
                          Pass Percentage
                        </label>
                        <input
                          type="number"
                          className="w-full border rounded p-1.5 text-sm"
                          placeholder="e.g. 70"
                        />
                      </div>
                    </QuizMetadataPanel>
                  </QuizInspector>
                </div>
              </div>

              <QuizBuilderFooter className="border-t p-2 text-xs text-muted-foreground bg-muted/10 flex justify-between">
                <span>Quiz ID: qz_89x21k</span>
                <span>Auto-saved 2 mins ago</span>
              </QuizBuilderFooter>
            </QuizBuilderWorkspace>
          </QuizBuilderProvider>
        )}

        {tab === "STRESS" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                1,000 Embedded Question Cards (Browser)
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Rendering native CSS Grid layout for extreme scale without virtual DOM overhead.
              </p>
              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 h-96 overflow-y-auto p-2 border rounded bg-card">
                {Array.from({ length: 1000 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 border rounded bg-muted/50 flex flex-col items-center justify-center text-[10px] text-muted-foreground hover:bg-primary/10 hover:border-primary cursor-pointer transition-colors"
                  >
                    <div>Card {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">100 Outline Items</h2>
                <div className="h-96 overflow-y-auto p-4 border rounded bg-card space-y-1">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2 text-xs border rounded bg-muted/20 flex justify-between items-center"
                    >
                      <span>Outline Node {i + 1}</span>
                      <span className="text-muted-foreground">☰</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">500 Selected Questions (Canvas)</h2>
                <div className="h-96 overflow-y-auto p-4 border rounded bg-card space-y-2">
                  {Array.from({ length: 500 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 text-sm border-l-4 border-l-primary border-y border-r rounded-r bg-muted/10 flex justify-between items-center shadow-sm"
                    >
                      <span className="font-medium">Selected Question #{i + 1}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">MCQ</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
