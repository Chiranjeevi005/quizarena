"use client";

import React, { useState } from "react";
import {
  QuestionCard,
  QuestionCardHeader,
  QuestionCardBody,
  QuestionCardFooter,
  QuestionTitle,
  QuestionDescription,
  QuestionMetadataRow,
  QuestionDifficultyBadge,
  QuestionStatusBadge,
  QuestionCategoryBadge,
  QuestionLanguageBadge,
  QuestionVersionBadge,
  QuestionVisibilityBadge,
  QuestionTagGroup,
  QuestionPlaceholder,
  QuestionLoading,
  QuestionEmpty,
  QuestionError,
} from "@/features/questions";
export default function QuestionsPlayground() {
  const [stressTest, setStressTest] = useState(false);

  // Generate 500 dummy questions for stress testing
  const dummyQuestions = Array.from({ length: 500 }).map((_, i) => ({
    id: `q-${i}`,
    title: `Sample Question ${i + 1} - Exploring the Depths of React Performance and Rendering Optimization Strategies in Large Scale Enterprise Applications`,
    description: `This is a detailed description for question ${i + 1}. It covers multiple lines and goes in-depth on the topic of how we can improve React rendering by using useMemo, useCallback, and virtualization.`,
    difficulty: ["beginner", "intermediate", "advanced", "expert"][i % 4] as any,
    status: ["draft", "review", "published", "archived", "rejected"][i % 5] as any,
    visibility: ["public", "private", "organization", "unlisted"][i % 4] as any,
    language: ["en", "fr", "es", "de"][i % 4],
    version: (i % 5) + 1,
    isLatest: i % 2 === 0,
    category: `Category ${i % 10}`,
    tags: Array.from({ length: (i % 6) + 1 }).map((_, j) => `tag-${j + 1}`),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="border-b border-border bg-card p-6">
        <h1 className="text-2xl font-bold">Question Bank Platform</h1>
        <p className="text-sm text-muted-foreground mt-1">FS-04.1 Core Presentation Architecture</p>
        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={stressTest}
              onChange={(e) => setStressTest(e.target.checked)}
              className="rounded border-input text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">500-Card Stress Test</span>
          </label>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        {!stressTest && (
          <>
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Full Composition Example</h2>
              <div className="max-w-3xl">
                <QuestionCard>
                  <QuestionCardHeader>
                    <QuestionMetadataRow>
                      <QuestionDifficultyBadge level="advanced" />
                      <QuestionStatusBadge status="review" />
                      <QuestionLanguageBadge languageCode="en" />
                      <QuestionVisibilityBadge level="organization" />
                    </QuestionMetadataRow>
                    <QuestionTitle title="What is the time complexity of QuickSort in the worst-case scenario, and how can it be mitigated using randomized pivot selection or the median-of-three method?" />
                  </QuestionCardHeader>
                  <QuestionCardBody>
                    <QuestionDescription description="This question asks candidates to explain algorithmic complexity and mitigation strategies for standard sorting algorithms, focusing on worst-case performance degradations." />
                    <QuestionTagGroup
                      tags={["algorithms", "sorting", "computer-science", "time-complexity"]}
                    />
                  </QuestionCardBody>
                  <QuestionCardFooter>
                    <QuestionCategoryBadge categoryName="Computer Science > Algorithms" />
                    <QuestionVersionBadge versionNumber={2} isLatest={true} />
                  </QuestionCardFooter>
                </QuestionCard>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Metadata Badges</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Difficulty</h3>
                  <div className="flex flex-col gap-2 items-start">
                    <QuestionDifficultyBadge level="beginner" />
                    <QuestionDifficultyBadge level="intermediate" />
                    <QuestionDifficultyBadge level="advanced" />
                    <QuestionDifficultyBadge level="expert" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="flex flex-col gap-2 items-start">
                    <QuestionStatusBadge status="draft" />
                    <QuestionStatusBadge status="review" />
                    <QuestionStatusBadge status="published" />
                    <QuestionStatusBadge status="archived" />
                    <QuestionStatusBadge status="rejected" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Visibility</h3>
                  <div className="flex flex-col gap-2 items-start">
                    <QuestionVisibilityBadge level="public" />
                    <QuestionVisibilityBadge level="organization" />
                    <QuestionVisibilityBadge level="private" />
                    <QuestionVisibilityBadge level="unlisted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Other Badges</h3>
                  <div className="flex flex-col gap-2 items-start">
                    <QuestionLanguageBadge languageCode="en" />
                    <QuestionLanguageBadge languageCode="fr" />
                    <QuestionVersionBadge versionNumber={1} />
                    <QuestionVersionBadge versionNumber={3} isLatest />
                    <QuestionCategoryBadge categoryName="Mathematics" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Presentation States</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Placeholder</h3>
                  <QuestionPlaceholder />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Loading</h3>
                  <QuestionLoading />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Empty</h3>
                  <QuestionEmpty message="No questions match your filters" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Error</h3>
                  <QuestionError
                    error="Failed to fetch question data from the server."
                    onRetry={() => alert("Retrying...")}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">
                Missing Metadata Graceful Degradation
              </h2>
              <div className="max-w-3xl">
                <QuestionCard>
                  <QuestionCardHeader>
                    <QuestionTitle title="Minimal Question without any badges or description" />
                  </QuestionCardHeader>
                  <QuestionCardBody>
                    <div className="text-sm text-muted-foreground italic">
                      No additional content
                    </div>
                  </QuestionCardBody>
                  <QuestionCardFooter>
                    <span className="text-xs text-muted-foreground">Minimal Footer</span>
                  </QuestionCardFooter>
                </QuestionCard>
              </div>
            </section>
          </>
        )}

        {stressTest && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">500-Card Stress Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dummyQuestions.map((q) => (
                <QuestionCard key={q.id}>
                  <QuestionCardHeader>
                    <QuestionMetadataRow>
                      <QuestionDifficultyBadge level={q.difficulty} />
                      <QuestionStatusBadge status={q.status} />
                    </QuestionMetadataRow>
                    <QuestionTitle title={q.title} />
                  </QuestionCardHeader>
                  <QuestionCardBody>
                    <QuestionDescription description={q.description} />
                    <QuestionTagGroup tags={q.tags} />
                  </QuestionCardBody>
                  <QuestionCardFooter>
                    <QuestionCategoryBadge categoryName={q.category} />
                    <QuestionLanguageBadge languageCode={q.language} />
                  </QuestionCardFooter>
                </QuestionCard>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
