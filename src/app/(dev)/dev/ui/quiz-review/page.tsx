"use client";
import React, { useState } from "react";
import {
  QuizReviewState,
  QuizReviewLayout,
  QuizReviewDensity,
  SubmissionState,
  SubmissionSeverity,
  ReviewFilter,
  SubmissionReadinessPresentation,
  ReviewStatisticsPresentation,
  QuestionReviewPresentation,
} from "@/features/quizzes/review";
import { QuizReviewProvider } from "@/features/quizzes/providers";
import {
  ReviewWorkspace,
  ReviewCanvas,
  ReviewSidebarRegion,
  ReviewSummaryRegion,
  ReviewSubmissionRegion,
  QuizReviewWorkspace,
  QuestionReviewCard,
  QuestionReviewSummary,
  QuestionReviewStatistics,
  SubmissionSummary,
  SubmissionReadiness,
  SubmissionChecklist,
  SubmissionConfirmationDialog,
  SubmissionWarningBanner,
  ReviewSidebar,
  ReviewQuestionList,
  ReviewQuestionTile,
  ReviewQuestionGroup,
  ReviewProgressSummary,
  ReviewFilterSummary,
  AnsweredIndicator,
  UnansweredIndicator,
  FlaggedIndicator,
  BookmarkedIndicator,
  ReadinessBadge,
  CompletionMeter,
  MissingAnswerPanel,
  SubmissionReadinessPanel,
} from "@/features/quizzes/components/review";

function GallerySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner">
        {children}
      </div>
    </div>
  );
}

const mockStats: ReviewStatisticsPresentation = {
  totalQuestions: 50,
  totalAnswered: 45,
  totalUnanswered: 5,
  totalFlagged: 2,
  totalBookmarked: 1,
  totalVisited: 50,
  completionPercentage: 90,
};

const mockReadinessReady: SubmissionReadinessPresentation = {
  completionPercentage: 100,
  answeredCount: 50,
  unansweredCount: 0,
  flaggedCount: 0,
  bookmarkedCount: 0,
  warningCount: 0,
  state: SubmissionState.READY,
  severity: SubmissionSeverity.SUCCESS,
  checklistItems: [
    { id: "1", label: "Answer all questions", isComplete: true, isRequired: true },
    { id: "2", label: "Review flagged questions", isComplete: true, isRequired: false },
  ],
};

const mockReadinessWarning: SubmissionReadinessPresentation = {
  completionPercentage: 90,
  answeredCount: 45,
  unansweredCount: 5,
  flaggedCount: 2,
  bookmarkedCount: 1,
  warningCount: 1,
  state: SubmissionState.WARNING,
  severity: SubmissionSeverity.WARNING,
  checklistItems: [
    { id: "1", label: "Answer all questions", isComplete: false, isRequired: true },
    { id: "2", label: "Review flagged questions", isComplete: false, isRequired: false },
  ],
};

const mockQuestion: QuestionReviewPresentation = {
  id: "q1",
  order: 1,
  title: "What is the capital of France?",
  isAnswered: true,
  isFlagged: false,
  isBookmarked: false,
  isVisited: true,
  type: "Multiple Choice",
  points: 1,
};

const mockQuestion2: QuestionReviewPresentation = {
  id: "q2",
  order: 2,
  title: "Explain the theory of relativity.",
  isAnswered: false,
  isFlagged: true,
  isBookmarked: false,
  isVisited: true,
  type: "Essay",
  points: 10,
};

function StressTestSection() {
  const [rendered, setRendered] = useState(false);

  if (!rendered) {
    return (
      <div className="mb-12 text-center py-12 bg-white rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Performance Stress Test</h2>
        <p className="text-gray-500 mb-6">
          Render 500 Cards, 100 Summaries, 100 Submission Panels, 100 Readiness Panels
        </p>
        <button
          onClick={() => setRendered(true)}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
        >
          Run Stress Test
        </button>
      </div>
    );
  }

  const cards = Array.from({ length: 500 }).map((_, i) => (
    <QuizReviewProvider key={`card-${i}`}>
      <QuestionReviewCard
        question={{ ...mockQuestion, id: `q${i}`, order: i + 1 }}
        statusSlot={i % 2 === 0 ? <AnsweredIndicator /> : <UnansweredIndicator />}
      />
    </QuizReviewProvider>
  ));

  const panels = Array.from({ length: 100 }).map((_, i) => (
    <QuizReviewProvider key={`sub-${i}`} initialState={{ readiness: mockReadinessReady }}>
      <SubmissionSummary />
    </QuizReviewProvider>
  ));

  const summaries = Array.from({ length: 100 }).map((_, i) => (
    <QuizReviewProvider key={`stat-${i}`} initialState={{ statistics: mockStats }}>
      <QuestionReviewStatistics />
    </QuizReviewProvider>
  ));

  const readinessPanels = Array.from({ length: 100 }).map((_, i) => (
    <QuizReviewProvider
      key={`read-${i}`}
      initialState={{ readiness: i % 2 === 0 ? mockReadinessReady : mockReadinessWarning }}
    >
      <SubmissionReadinessPanel />
    </QuizReviewProvider>
  ));

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Stress Test Results
      </h2>

      <div className="h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg border mb-8 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-700 sticky top-0 bg-gray-100 py-2">
          500 Question Cards
        </h3>
        {cards}
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg border mb-8 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700 sticky top-0 bg-gray-100 py-2">
          100 Statistics Panels
        </h3>
        {summaries}
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg border mb-8 grid grid-cols-2 gap-4">
        <h3 className="font-semibold text-gray-700 col-span-2 sticky top-0 bg-gray-100 py-2">
          100 Submission Summaries
        </h3>
        {panels}
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg border mb-8 grid grid-cols-3 gap-4">
        <h3 className="font-semibold text-gray-700 col-span-3 sticky top-0 bg-gray-100 py-2">
          100 Readiness Panels
        </h3>
        {readinessPanels}
      </div>
    </div>
  );
}

export default function QuizReviewPlayground() {
  return (
    <div className="min-h-screen bg-white p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Enterprise Quiz Review & Submission Platform
        </h1>
        <p className="text-gray-500 mb-12">
          Presentation validation environment (FS-06.5) — Zero business logic
        </p>

        {/* 1. Layout Gallery - Full Review */}
        <GallerySection title="Layout: Split Review (with Sidebar and Canvas)">
          <div className="h-[600px] w-full">
            <QuizReviewProvider
              initialState={{ statistics: mockStats, readiness: mockReadinessWarning }}
            >
              <ReviewWorkspace>
                <ReviewSidebarRegion>
                  <ReviewSidebar>
                    <ReviewFilterSummary />
                    <ReviewProgressSummary />
                    <ReviewQuestionList>
                      <ReviewQuestionGroup title="Section 1">
                        <ReviewQuestionTile question={mockQuestion} />
                        <ReviewQuestionTile question={mockQuestion2} />
                      </ReviewQuestionGroup>
                    </ReviewQuestionList>
                  </ReviewSidebar>
                </ReviewSidebarRegion>

                <div className="flex flex-col flex-1">
                  <ReviewSummaryRegion>
                    <div className="p-6">
                      <QuestionReviewStatistics />
                    </div>
                  </ReviewSummaryRegion>

                  <ReviewCanvas>
                    <QuestionReviewCard
                      question={mockQuestion}
                      statusSlot={<AnsweredIndicator />}
                      actionSlot={
                        <button className="text-sm font-medium text-indigo-600">
                          Review Question
                        </button>
                      }
                    />
                    <QuestionReviewCard
                      question={mockQuestion2}
                      statusSlot={<UnansweredIndicator />}
                      leadingSlot={<FlaggedIndicator />}
                      actionSlot={
                        <button className="text-sm font-medium text-indigo-600">
                          Review Question
                        </button>
                      }
                    />
                  </ReviewCanvas>

                  <ReviewSubmissionRegion>
                    <div className="p-4 flex items-center justify-between px-6">
                      <div className="flex gap-4">
                        <ReadinessBadge />
                        <span className="text-sm text-gray-600 font-medium pt-1">
                          5 Questions remaining
                        </span>
                      </div>
                      <SubmissionReadiness />
                    </div>
                  </ReviewSubmissionRegion>
                </div>
              </ReviewWorkspace>
            </QuizReviewProvider>
          </div>
        </GallerySection>

        {/* 2. Readiness Gallery */}
        <GallerySection title="Readiness States">
          <div className="p-8 grid grid-cols-2 gap-8 bg-white">
            <QuizReviewProvider initialState={{ readiness: mockReadinessReady }}>
              <div className="flex flex-col gap-4">
                <SubmissionReadinessPanel />
                <SubmissionChecklist />
              </div>
            </QuizReviewProvider>

            <QuizReviewProvider initialState={{ readiness: mockReadinessWarning }}>
              <div className="flex flex-col gap-4">
                <SubmissionReadinessPanel />
                <SubmissionWarningBanner />
                <MissingAnswerPanel />
                <SubmissionChecklist />
              </div>
            </QuizReviewProvider>
          </div>
        </GallerySection>

        {/* 3. Submission Confirmation Gallery */}
        <GallerySection title="Submission Confirmation (Dialog)">
          <div className="h-[400px] bg-white relative">
            {/* We force the dialog to show by passing state: CONFIRMING */}
            <QuizReviewProvider
              initialState={{ state: QuizReviewState.CONFIRMING, readiness: mockReadinessReady }}
            >
              <SubmissionConfirmationDialog className="absolute" />
            </QuizReviewProvider>
          </div>
        </GallerySection>

        {/* 4. Completion Engine Gallery */}
        <GallerySection title="Completion Engine Visualizations">
          <div className="p-8 flex items-center justify-center gap-16 bg-white">
            <QuizReviewProvider initialState={{ readiness: mockReadinessWarning }}>
              <CompletionMeter />
            </QuizReviewProvider>

            <QuizReviewProvider initialState={{ readiness: mockReadinessReady }}>
              <CompletionMeter />
            </QuizReviewProvider>
          </div>
        </GallerySection>

        {/* 5. Accessibility & Semantic Components Gallery */}
        <GallerySection title="Semantic Review Elements (Badges & Indicators)">
          <div className="p-8 flex flex-wrap gap-4 bg-white items-center">
            <QuizReviewProvider initialState={{ readiness: mockReadinessReady }}>
              <ReadinessBadge />
            </QuizReviewProvider>
            <QuizReviewProvider initialState={{ readiness: mockReadinessWarning }}>
              <ReadinessBadge />
            </QuizReviewProvider>
            <QuizReviewProvider
              initialState={{
                readiness: { ...mockReadinessWarning, state: SubmissionState.BLOCKED },
              }}
            >
              <ReadinessBadge />
            </QuizReviewProvider>

            <div className="w-px h-8 bg-gray-200 mx-4"></div>

            <AnsweredIndicator />
            <UnansweredIndicator />
            <BookmarkedIndicator />
            <FlaggedIndicator />
          </div>
        </GallerySection>

        {/* 6. Stress Test */}
        <StressTestSection />
      </div>
    </div>
  );
}
