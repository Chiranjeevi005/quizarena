"use client";
import React from "react";
import { useQuizTimer } from "../../../timer/QuizTimerContext";
import { QuizTimerLayout } from "../../../timer/QuizTimerLayout";
import { EmbeddedTimerRegion } from "./EmbeddedTimerRegion";
import { FloatingTimerRegion } from "./FloatingTimerRegion";
import { FullscreenTimerRegion } from "./FullscreenTimerRegion";

export function TimerRegion({ children }: { children: React.ReactNode }) {
  const { config } = useQuizTimer();

  if (config.layout === QuizTimerLayout.EMBEDDED)
    return <EmbeddedTimerRegion>{children}</EmbeddedTimerRegion>;
  if (config.layout === QuizTimerLayout.FLOATING)
    return <FloatingTimerRegion>{children}</FloatingTimerRegion>;
  if (config.layout === QuizTimerLayout.FULLSCREEN)
    return <FullscreenTimerRegion>{children}</FullscreenTimerRegion>;

  // Default to embedded if sidebar is handled by a parent layout, etc.
  return <EmbeddedTimerRegion>{children}</EmbeddedTimerRegion>;
}
