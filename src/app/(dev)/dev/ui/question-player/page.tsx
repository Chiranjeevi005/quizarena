"use client";

import React, { useState } from "react";
import {
  QuestionPlayerProvider,
  PlayerWorkspace,
  PlayerCanvas,
  PlayerViewport,
  PlayerSidebar,
  PlayerReady,
  PlayerLoading,
  PlayerPaused,
  PlayerReadonly,
  PlayerError,
  PlayerReviewPlaceholder,
  PlayerCompletedPlaceholder,
  QuestionRenderEngine,
  QuestionRenderer,
  QuestionOptionRenderer,
  QuestionInstructionBar,
  QuestionPlayerMode,
  QuestionPlayerLayout,
  QuestionPlayerView,
} from "@/features/quizzes";

// Note: The actual QuestionRenderer component in FS-06.2 acts as a shell
// delegating to the QuestionRenderEngine which loads the FS-04.2 QuestionCards.
// For the playground, we will mock these FS-04.2 cards.
const MockMCQCard = ({ children, className }: any) => (
  <div className={`border p-4 rounded-lg bg-card shadow-sm ${className}`}>
    [FS-04.2 MCQCard] {children}
  </div>
);
const MockMSQCard = ({ children, className }: any) => (
  <div className={`border p-4 rounded-lg bg-card shadow-sm ${className}`}>
    [FS-04.2 MSQCard] {children}
  </div>
);
const MockCodingCard = ({ children, className }: any) => (
  <div className={`border p-4 rounded-lg bg-card shadow-sm font-mono ${className}`}>
    [FS-04.2 CodingCard] {children}
  </div>
);

export default function QuestionPlayerPlayground() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [playerMode, setPlayerMode] = useState<QuestionPlayerMode>("DEFAULT");
  const [playerLayout, setPlayerLayout] = useState<QuestionPlayerLayout>("STANDARD");

  const handleOptionToggle = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const optionClass = (id: string) =>
    `p-3 border rounded-md cursor-pointer transition-colors ${
      selectedOptions.includes(id)
        ? "bg-primary/10 border-primary text-primary font-medium"
        : "hover:bg-muted/50"
    } ${playerMode === "READONLY" ? "opacity-50 pointer-events-none" : ""}`;

  return (
    <QuestionPlayerProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-border bg-card p-4 sticky top-0 z-10 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Enterprise Question Player</h1>
            <p className="text-xs text-muted-foreground mt-1">
              FS-06.2 Composition Engine (UI Interaction Only)
            </p>
          </div>
          <div className="flex gap-4">
            <select
              value={playerMode}
              onChange={(e) => setPlayerMode(e.target.value as QuestionPlayerMode)}
              className="text-sm border rounded p-1"
            >
              <option value="DEFAULT">Mode: DEFAULT</option>
              <option value="READONLY">Mode: READONLY</option>
              <option value="COMPACT">Mode: COMPACT</option>
            </select>
            <select
              value={playerLayout}
              onChange={(e) => setPlayerLayout(e.target.value as QuestionPlayerLayout)}
              className="text-sm border rounded p-1"
            >
              <option value="STANDARD">Layout: STANDARD</option>
              <option value="FOCUSED">Layout: FOCUSED</option>
              <option value="SPLIT">Layout: SPLIT</option>
            </select>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-12">
          <section>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Renderer Composition Gallery
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <PlayerWorkspace className="h-96 border rounded-lg overflow-hidden flex flex-col">
                <div className="text-xs font-bold uppercase p-2 border-b bg-muted/10">
                  QuestionRenderer (MCQ Mapping)
                </div>
                <PlayerCanvas className="flex-1 bg-background overflow-auto p-4 flex flex-col gap-4">
                  <QuestionInstructionBar className="text-xs font-semibold text-primary uppercase bg-primary/10 p-2 rounded">
                    Choose ONE answer.
                  </QuestionInstructionBar>
                  <MockMCQCard className="flex-1 flex flex-col gap-2">
                    <h3 className="font-medium text-lg">
                      What is the time complexity of QuickSort?
                    </h3>
                    <div className="flex-1 flex flex-col gap-2 mt-4">
                      {["O(n)", "O(n log n)", "O(n²)", "O(log n)"].map((opt, i) => (
                        <QuestionOptionRenderer
                          key={i}
                          className={optionClass(opt)}
                          onClick={() => handleOptionToggle(opt)}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border ${selectedOptions.includes(opt) ? "bg-primary border-primary" : ""}`}
                            />
                            {opt}
                          </div>
                        </QuestionOptionRenderer>
                      ))}
                    </div>
                  </MockMCQCard>
                </PlayerCanvas>
              </PlayerWorkspace>

              <PlayerWorkspace className="h-96 border rounded-lg overflow-hidden flex flex-col">
                <div className="text-xs font-bold uppercase p-2 border-b bg-muted/10">
                  QuestionRenderer (MSQ Mapping)
                </div>
                <PlayerCanvas className="flex-1 bg-background overflow-auto p-4 flex flex-col gap-4">
                  <QuestionInstructionBar className="text-xs font-semibold text-primary uppercase bg-primary/10 p-2 rounded">
                    Choose ALL that apply.
                  </QuestionInstructionBar>
                  <MockMSQCard className="flex-1 flex flex-col gap-2">
                    <h3 className="font-medium text-lg">Which of these are React hooks?</h3>
                    <div className="flex-1 flex flex-col gap-2 mt-4">
                      {["useState", "useForm", "useEffect", "useRender"].map((opt, i) => (
                        <QuestionOptionRenderer
                          key={i}
                          className={optionClass(opt)}
                          onClick={() => handleOptionToggle(opt)}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${selectedOptions.includes(opt) ? "bg-primary border-primary" : ""}`}
                            />
                            {opt}
                          </div>
                        </QuestionOptionRenderer>
                      ))}
                    </div>
                  </MockMSQCard>
                </PlayerCanvas>
              </PlayerWorkspace>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Player State Gallery</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="border rounded h-40 flex items-center justify-center bg-muted/5">
                <PlayerLoading className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="text-xs">Loading Question...</span>
                </PlayerLoading>
              </div>
              <div className="border rounded h-40 flex items-center justify-center bg-yellow-500/5">
                <PlayerPaused className="text-center">
                  <div className="text-3xl mb-2">⏸</div>
                  <div className="text-sm font-semibold">Session Paused</div>
                  <div className="text-xs text-muted-foreground mt-1">Player UI frozen.</div>
                </PlayerPaused>
              </div>
              <div className="border rounded h-40 flex items-center justify-center bg-red-500/5">
                <PlayerError className="text-center text-red-600">
                  <div className="text-3xl mb-2">⚠</div>
                  <div className="text-sm font-semibold">Failed to render</div>
                </PlayerError>
              </div>
              <div className="border rounded h-40 flex items-center justify-center bg-blue-500/5">
                <PlayerReviewPlaceholder className="text-center text-blue-600">
                  <div className="text-3xl mb-2">👁</div>
                  <div className="text-sm font-semibold">Review Mode</div>
                </PlayerReviewPlaceholder>
              </div>
            </div>
          </section>
        </div>
      </div>
    </QuestionPlayerProvider>
  );
}
