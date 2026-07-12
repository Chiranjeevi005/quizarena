"use client";
import React, { useState } from "react";
import {
  QuizTimerProvider,
  QuizTimerState,
  QuizTimerVariant,
  QuizTimerLayout,
  QuizTimerDensity,
  QuizTimerSize,
  QuizTimerDisplay,
  QuizTimerFormat,
  QuizTimerWarningLevel,
  SessionHealth,
} from "@/features/quizzes/timer";
import {
  QuizTimer,
  DigitalTimer,
  CompactTimer,
  FloatingTimer,
  TimerBadge,
  TimerProgressRing,
  SessionStatusBadge,
  SessionHealthIndicator,
  SessionPhaseBadge,
  TimeWarningBanner,
  SessionLockBanner,
  LowTimeIndicator,
  CriticalTimeIndicator,
  TimerProgressBar,
} from "@/features/quizzes/components/timer";

function GallerySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="flex flex-wrap gap-8 items-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        {children}
      </div>
    </div>
  );
}

function StressTestSection() {
  const [rendered, setRendered] = useState(false);

  if (!rendered) {
    return (
      <div className="mb-12 text-center py-12 bg-white rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Performance Stress Test</h2>
        <p className="text-gray-500 mb-6">Render 100 Timers, 50 Status Panels, and 100 Warnings</p>
        <button
          onClick={() => setRendered(true)}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
        >
          Run Stress Test
        </button>
      </div>
    );
  }

  const timers = Array.from({ length: 100 }).map((_, i) => (
    <QuizTimerProvider
      key={`timer-${i}`}
      initialTime={{
        displayTime: "45:00",
        remainingTimeMs: 45 * 60000,
        elapsedTimeMs: 0,
        totalTimeMs: 60 * 60000,
        percentageComplete: 25,
        warningLevel: QuizTimerWarningLevel.NORMAL,
        state: QuizTimerState.RUNNING,
      }}
    >
      <CompactTimer />
    </QuizTimerProvider>
  ));

  const panels = Array.from({ length: 50 }).map((_, i) => (
    <QuizTimerProvider
      key={`panel-${i}`}
      initialSession={{ health: SessionHealth.NORMAL, phase: "Active", isLocked: false }}
    >
      <SessionStatusBadge />
    </QuizTimerProvider>
  ));

  const warnings = Array.from({ length: 100 }).map((_, i) => (
    <QuizTimerProvider
      key={`warn-${i}`}
      initialTime={{
        displayTime: "01:00",
        remainingTimeMs: 60000,
        elapsedTimeMs: 3540000,
        totalTimeMs: 3600000,
        percentageComplete: 98,
        warningLevel: QuizTimerWarningLevel.CRITICAL,
        state: QuizTimerState.RUNNING,
      }}
    >
      <CriticalTimeIndicator />
    </QuizTimerProvider>
  ));

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Stress Test Results
      </h2>

      <h3 className="font-semibold text-gray-700 mb-4 mt-6">100 Compact Timers</h3>
      <div className="flex flex-wrap gap-2">{timers}</div>

      <h3 className="font-semibold text-gray-700 mb-4 mt-8">50 Status Panels</h3>
      <div className="flex flex-wrap gap-2">{panels}</div>

      <h3 className="font-semibold text-gray-700 mb-4 mt-8">100 Critical Warnings</h3>
      <div className="flex flex-wrap gap-2">{warnings}</div>
    </div>
  );
}

export default function QuizTimerPlayground() {
  const normalTime = {
    displayTime: "45:00",
    remainingTimeMs: 45 * 60000,
    elapsedTimeMs: 15 * 60000,
    totalTimeMs: 60 * 60000,
    percentageComplete: 25,
    warningLevel: QuizTimerWarningLevel.NORMAL,
    state: QuizTimerState.RUNNING,
  };
  const warningTime = {
    displayTime: "05:00",
    remainingTimeMs: 5 * 60000,
    elapsedTimeMs: 55 * 60000,
    totalTimeMs: 60 * 60000,
    percentageComplete: 91,
    warningLevel: QuizTimerWarningLevel.WARNING,
    state: QuizTimerState.RUNNING,
  };
  const criticalTime = {
    displayTime: "01:15",
    remainingTimeMs: 75000,
    elapsedTimeMs: 3525000,
    totalTimeMs: 3600000,
    percentageComplete: 98,
    warningLevel: QuizTimerWarningLevel.CRITICAL,
    state: QuizTimerState.RUNNING,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Enterprise Quiz Timer & Session Status Platform
        </h1>
        <p className="text-gray-500 mb-12">
          Presentation validation environment (FS-06.4) — Zero interval execution
        </p>

        {/* 1. Timer Variants Gallery */}
        <GallerySection title="Timer Variants (Normal State)">
          <QuizTimerProvider initialTime={normalTime} initialConfig={{ size: QuizTimerSize.MD }}>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Digital</span>
              <DigitalTimer />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Compact</span>
              <CompactTimer />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Badge</span>
              <TimerBadge />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xs text-gray-400">Progress Ring</span>
              <TimerProgressRing size={100} strokeWidth={6} />
            </div>
          </QuizTimerProvider>
        </GallerySection>

        {/* 2. Warning States */}
        <GallerySection title="Warning Levels (Critical State)">
          <QuizTimerProvider initialTime={criticalTime} initialConfig={{ size: QuizTimerSize.MD }}>
            <DigitalTimer />
            <CompactTimer />
            <TimerBadge />
            <TimerProgressRing size={100} strokeWidth={6} />
          </QuizTimerProvider>
        </GallerySection>

        {/* 3. Sizes Gallery */}
        <GallerySection title="Timer Sizes (Digital Variant)">
          {[
            QuizTimerSize.XS,
            QuizTimerSize.SM,
            QuizTimerSize.MD,
            QuizTimerSize.LG,
            QuizTimerSize.XL,
          ].map((size) => (
            <QuizTimerProvider key={size} initialTime={normalTime} initialConfig={{ size }}>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs text-gray-400">{size}</span>
                <DigitalTimer />
              </div>
            </QuizTimerProvider>
          ))}
        </GallerySection>

        {/* 4. Session Status */}
        <GallerySection title="Session Health Indicators">
          {[
            SessionHealth.NORMAL,
            SessionHealth.WARNING,
            SessionHealth.CRITICAL,
            SessionHealth.LOCKED,
            SessionHealth.OFFLINE,
          ].map((health) => (
            <QuizTimerProvider
              key={health}
              initialSession={{
                health,
                phase: "Active",
                isLocked: health === SessionHealth.LOCKED,
              }}
            >
              <div className="flex flex-col gap-4">
                <SessionStatusBadge />
                <SessionHealthIndicator />
              </div>
            </QuizTimerProvider>
          ))}
        </GallerySection>

        {/* 5. Warning Banners */}
        <GallerySection title="Warning & Action Banners">
          <div className="flex flex-col w-full gap-4">
            <QuizTimerProvider initialTime={warningTime}>
              <TimeWarningBanner />
              <LowTimeIndicator />
            </QuizTimerProvider>

            <QuizTimerProvider initialTime={criticalTime}>
              <TimeWarningBanner />
              <CriticalTimeIndicator />
            </QuizTimerProvider>

            <QuizTimerProvider
              initialSession={{
                health: SessionHealth.LOCKED,
                phase: "Review",
                isLocked: true,
                message: "Violation detected. Proctor intervention required.",
              }}
            >
              <SessionLockBanner />
            </QuizTimerProvider>
          </div>
        </GallerySection>

        {/* 6. Layout Composition Demo */}
        <GallerySection title="Layout Composition Demo (QuizTimer Slots)">
          <div className="w-full h-80 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-300 shadow-inner p-4">
            <QuizTimerProvider
              initialTime={normalTime}
              initialSession={{ health: SessionHealth.NORMAL, phase: "Active", isLocked: false }}
            >
              <QuizTimer
                className="h-full shadow-lg"
                headerSlot={
                  <div className="px-4 py-3 border-b flex justify-between items-center bg-white">
                    <div className="font-semibold">Section 1: Reading Comprehension</div>
                    <div className="flex items-center gap-4">
                      <SessionPhaseBadge />
                      <CompactTimer />
                    </div>
                  </div>
                }
                bodySlot={
                  <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Quiz content goes here...</p>
                  </div>
                }
                footerSlot={
                  <div className="border-t bg-white p-3">
                    <TimerProgressBar />
                  </div>
                }
              />
            </QuizTimerProvider>
          </div>
        </GallerySection>

        {/* 7. Stress Test */}
        <StressTestSection />
      </div>
    </div>
  );
}
