"use client";

import React, { useEffect, useState } from "react";
import { useWizardStore } from "../../context/useWizardStore";
import { analyzeCompetitionDraftAction } from "@/competitions/actions/analytics.actions";
import { IntelligenceReport } from "@/competitions/services/AssessmentAnalyticsService";

export const AssessmentIntelligenceKernel: React.FC = () => {
  const { draftData } = useWizardStore();
  const draftDataStr = JSON.stringify(draftData);
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Debounce the analytics request slightly so we don't spam the server on every drag
    const timeout = setTimeout(async () => {
      setIsLoading(true);
      const result = await analyzeCompetitionDraftAction(JSON.parse(draftDataStr));
      if (result.success && result.data) {
        setReport(result.data);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [draftDataStr]); // Re-run when draftData changes

  if (!report) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full sticky top-24">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-navy flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Intelligence
        </h3>
        {isLoading && <span className="text-xs text-gray-400 animate-pulse">Analyzing...</span>}
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        {/* Health Score */}
        <div
          className={`p-4 rounded-lg border flex items-center justify-between ${getScoreColor(report.healthScore)}`}
        >
          <div>
            <div className="text-sm font-semibold opacity-80">Health Score</div>
            <div className="text-3xl font-black">{report.healthScore}/100</div>
          </div>
          {report.healthScore >= 80 && <div className="text-4xl">🏆</div>}
          {report.healthScore >= 50 && report.healthScore < 80 && (
            <div className="text-4xl">⚖️</div>
          )}
          {report.healthScore < 50 && <div className="text-4xl">⚠️</div>}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 font-medium mb-1">Total Qs</div>
            <div className="text-xl font-bold text-gray-800">{report.totalQuestions}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 font-medium mb-1">Total Marks</div>
            <div className="text-xl font-bold text-gray-800">{report.totalMarks}</div>
          </div>
        </div>

        {/* Difficulty Distribution */}
        {report.totalQuestions > 0 && (
          <div>
            <div className="text-sm font-bold text-gray-700 mb-3">Difficulty Spread</div>
            <div className="flex h-3 rounded-full overflow-hidden mb-2">
              <div
                style={{ width: `${(report.difficultySplit.EASY / report.totalQuestions) * 100}%` }}
                className="bg-green-400"
              ></div>
              <div
                style={{
                  width: `${(report.difficultySplit.MEDIUM / report.totalQuestions) * 100}%`,
                }}
                className="bg-yellow-400"
              ></div>
              <div
                style={{ width: `${(report.difficultySplit.HARD / report.totalQuestions) * 100}%` }}
                className="bg-red-400"
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> Easy (
                {report.difficultySplit.EASY})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Medium (
                {report.difficultySplit.MEDIUM})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400"></span> Hard (
                {report.difficultySplit.HARD})
              </span>
            </div>
          </div>
        )}

        {/* Warnings & Recommendations */}
        <div className="space-y-3">
          {report.warnings.map((w, i) => (
            <div
              key={`w-${i}`}
              className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm flex items-start gap-2"
            >
              <svg
                className="w-5 h-5 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{w}</span>
            </div>
          ))}
          {report.recommendations.map((r, i) => (
            <div
              key={`r-${i}`}
              className="p-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm flex items-start gap-2"
            >
              <svg
                className="w-5 h-5 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
