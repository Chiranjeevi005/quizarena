"use client";

import React, { useState } from "react";
import {
  QuizResultsProvider,
  ResultsWorkspace,
  ResultsCanvas,
  ResultsSidebar,
  ResultsDashboard,
  ResultsGrid,
  ResultsOverviewRegion,
  ResultsHighlightsRegion,
  ResultsAnalyticsRegion,
  ResultsInsightsRegion,
  ResultsBreakdownRegion,
  ResultsTimelineRegion,
  PerformanceSummary,
  ScoreSummary,
  AccuracySummary,
  SpeedSummary,
  ResultOverviewCard,
  ResultHighlights,
  PerformanceAnalytics,
  AccuracyAnalytics,
  TimeAnalytics,
  TrendAnalytics,
  TopicBreakdown,
  DifficultyBreakdown,
  SectionBreakdown,
  BreakdownCard,
  LearningInsights,
  StrengthPanel,
  WeaknessPanel,
  LearningGuidancePanel,
  SuggestedActions,
  InsightCard,
} from "@/features/quizzes";

// Mock FS-03 Dashboard Primitives
const MockKPI = ({ title, value, status }: any) => (
  <div className="border p-4 rounded bg-card flex flex-col gap-1 shadow-sm">
    <span className="text-xs text-muted-foreground uppercase font-bold">{title}</span>
    <span className={`text-xl font-bold ${status === "success" ? "text-green-600" : ""}`}>
      {value}
    </span>
  </div>
);
const MockWidget = ({ title, children, className }: any) => (
  <div className={`border p-4 rounded bg-card shadow-sm flex flex-col gap-3 ${className}`}>
    <div className="font-semibold text-sm border-b pb-2">{title}</div>
    <div className="flex-1">{children}</div>
  </div>
);

export default function QuizResultsPlayground() {
  const [reportType, setReportType] = useState<
    "STUDENT" | "EXECUTIVE" | "INSTRUCTOR" | "ORGANIZATION" | "STRESS"
  >("STUDENT");

  return (
    <QuizResultsProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-border bg-card p-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-xl font-bold">Enterprise Quiz Results Platform</h1>
            <p className="text-xs text-muted-foreground mt-1">FS-06.6 Presentation Architecture</p>
          </div>
          <div className="flex gap-2">
            {["STUDENT", "EXECUTIVE", "INSTRUCTOR", "ORGANIZATION", "STRESS"].map((r) => (
              <button
                key={r}
                className={`px-3 py-1 text-xs border rounded ${reportType === r ? "bg-primary text-white" : ""}`}
                onClick={() => setReportType(r as any)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 bg-muted/20">
          <ResultsWorkspace className="max-w-6xl mx-auto space-y-6">
            {reportType === "STUDENT" && (
              <>
                <ResultsOverviewRegion className="grid grid-cols-4 gap-4">
                  <MockKPI title="Final Score" value="85%" status="success" />
                  <MockKPI title="Accuracy" value="92%" status="success" />
                  <MockKPI title="Time Taken" value="45m 12s" />
                  <MockKPI title="Percentile" value="94th" />
                </ResultsOverviewRegion>

                <ResultsHighlightsRegion className="flex gap-4">
                  <ResultHighlights className="flex-1 p-4 border rounded bg-blue-500/5 text-blue-900 border-blue-200">
                    <span className="font-bold text-sm uppercase">Top Strength:</span>{" "}
                    <span className="text-sm">Advanced React Patterns</span>
                  </ResultHighlights>
                  <ResultHighlights className="flex-1 p-4 border rounded bg-orange-500/5 text-orange-900 border-orange-200">
                    <span className="font-bold text-sm uppercase">Improvement Area:</span>{" "}
                    <span className="text-sm">Time Complexity Analysis</span>
                  </ResultHighlights>
                </ResultsHighlightsRegion>

                <ResultsDashboard className="grid grid-cols-3 gap-6">
                  <ResultsCanvas className="col-span-2 space-y-6">
                    <ResultsAnalyticsRegion>
                      <MockWidget title="Performance Over Time [FS-03 ChartWidget]">
                        <div className="h-40 bg-muted/30 border border-dashed rounded flex items-center justify-center text-xs text-muted-foreground">
                          Line Chart Mock
                        </div>
                      </MockWidget>
                    </ResultsAnalyticsRegion>

                    <ResultsBreakdownRegion className="grid grid-cols-2 gap-4">
                      <MockWidget title="Section Breakdown">
                        <div className="space-y-2">
                          {["Fundamentals", "Architecture", "Deployment"].map((s) => (
                            <div
                              key={s}
                              className="text-xs flex justify-between p-2 bg-muted/10 rounded"
                            >
                              <span>{s}</span>
                              <span className="font-bold">8/10</span>
                            </div>
                          ))}
                        </div>
                      </MockWidget>
                      <MockWidget title="Difficulty Breakdown">
                        <div className="h-24 bg-muted/30 border border-dashed rounded flex items-center justify-center text-xs text-muted-foreground">
                          Pie Chart Mock
                        </div>
                      </MockWidget>
                    </ResultsBreakdownRegion>
                  </ResultsCanvas>

                  <ResultsSidebar className="space-y-6">
                    <ResultsInsightsRegion>
                      <MockWidget title="Learning Guidance">
                        <div className="space-y-3">
                          <LearningGuidancePanel className="p-3 border rounded bg-card text-xs">
                            <h4 className="font-bold mb-1">Suggested Actions</h4>
                            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                              <li>Review memoization hooks</li>
                              <li>Practice 5 Big O notation exercises</li>
                            </ul>
                          </LearningGuidancePanel>
                        </div>
                      </MockWidget>
                    </ResultsInsightsRegion>
                  </ResultsSidebar>
                </ResultsDashboard>
              </>
            )}

            {reportType === "EXECUTIVE" && (
              <ResultsDashboard className="space-y-6">
                <h2 className="text-lg font-bold">Executive Overview: Q2 Assessments</h2>
                <ResultsOverviewRegion className="grid grid-cols-5 gap-4">
                  <MockKPI title="Total Participants" value="1,245" />
                  <MockKPI title="Pass Rate" value="78%" />
                  <MockKPI title="Avg Score" value="72%" />
                  <MockKPI title="Time Invested" value="840 hrs" />
                  <MockKPI title="Certifications" value="890" status="success" />
                </ResultsOverviewRegion>
                <ResultsAnalyticsRegion className="grid grid-cols-2 gap-6">
                  <MockWidget title="Organization Performance Trend">
                    <div className="h-64 bg-muted/30 border border-dashed rounded flex items-center justify-center text-xs text-muted-foreground">
                      Multi-Line Chart Mock
                    </div>
                  </MockWidget>
                  <MockWidget title="Skill Gap Analysis">
                    <div className="h-64 bg-muted/30 border border-dashed rounded flex items-center justify-center text-xs text-muted-foreground">
                      Radar Chart Mock
                    </div>
                  </MockWidget>
                </ResultsAnalyticsRegion>
              </ResultsDashboard>
            )}

            {reportType === "STRESS" && (
              <ResultsDashboard className="space-y-6">
                <h2 className="text-lg font-bold">Stress Test: Massive Scale Composition</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Rendering 100 KPIs, 60 Widgets, 40 Analytics Panels, 300 Breakdowns, 150 Insights.
                </p>

                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <MockKPI key={i} title={`KPI ${i}`} value={(i * 17) % 100} />
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <MockWidget key={i} title={`Widget ${i}`} className="h-32">
                      <div className="h-full bg-muted/10"></div>
                    </MockWidget>
                  ))}
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 300 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2 border bg-card text-[10px] rounded shadow-sm text-center"
                    >
                      Breakdown {i}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 150 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2 border border-blue-200 bg-blue-50 text-[10px] rounded shadow-sm text-center"
                    >
                      Guidance {i}
                    </div>
                  ))}
                </div>
              </ResultsDashboard>
            )}

            {(reportType === "INSTRUCTOR" || reportType === "ORGANIZATION") && (
              <ResultsDashboard className="flex items-center justify-center h-64 border rounded-lg bg-card text-muted-foreground text-sm">
                Select STUDENT, EXECUTIVE, or STRESS to view compositions.
              </ResultsDashboard>
            )}
          </ResultsWorkspace>
        </div>
      </div>
    </QuizResultsProvider>
  );
}
