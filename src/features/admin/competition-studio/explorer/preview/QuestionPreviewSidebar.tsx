"use client";

import React, { useEffect, useState } from "react";
import { useExplorerStore } from "../stores/useExplorerStore";
// Using the same server action or a separate detail fetch.
// In a real app we would have a specific getQuestionDetail action,
// but we can mock it here for the UI based on the ID.

export const QuestionPreviewSidebar: React.FC = () => {
  const { previewId, selectionBasket, toggleSelection } = useExplorerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [questionDetail, setQuestionDetail] = useState<any>(null);

  useEffect(() => {
    if (!previewId) {
      setQuestionDetail(null);
      return;
    }

    // Mock fetching full details based on previewId
    setIsLoading(true);
    const timer = setTimeout(() => {
      setQuestionDetail({
        id: previewId,
        title: "Sample Question Title for Preview",
        text: "This is a detailed mock description of the question body. In production, this would render markdown or rich text representing the exact prompt the candidate will see.",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctOptionIndex: 0,
        explanation: "Here is the detailed explanation for why Option A is the correct answer.",
        metadata: {
          difficulty: "MEDIUM",
          healthScore: 92,
          usageCount: 45,
          successRate: "68%",
          avgTime: "45s",
        },
      });
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [previewId]);

  if (!previewId) {
    return (
      <aside className="w-96 border-l border-gray-200 bg-gray-50 hidden xl:flex flex-col shrink-0">
        <header className="h-14 border-b border-gray-200 flex items-center px-4 font-semibold text-gray-800 bg-white">
          Question Preview
        </header>
        <div className="flex-1 p-8 text-center flex flex-col items-center justify-center text-gray-500">
          <span className="text-4xl mb-4">👁️</span>
          <p className="text-sm">
            Select a question from the grid to see detailed preview, analytics, and health metrics
            here.
          </p>
        </div>
      </aside>
    );
  }

  const isSelected = selectionBasket.has(previewId);

  return (
    <aside className="w-96 border-l border-gray-200 bg-white hidden xl:flex flex-col shrink-0 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10 relative">
      <header className="h-14 border-b border-gray-200 flex items-center px-4 font-semibold text-gray-800 justify-between">
        <span>Preview</span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>✕
          </button>
        </div>
      </header>

      {isLoading || !questionDetail ? (
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500" />
            <div className="text-sm text-gray-500 font-medium">Loading details...</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Header Info */}
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-900 leading-snug">{questionDetail.title}</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-md border border-yellow-200">
                {questionDetail.metadata.difficulty}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md border border-blue-200">
                Health: {questionDetail.metadata.healthScore}/100
              </span>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Prompt
            </h4>
            <div className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              {questionDetail.text}
            </div>

            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">
              Options
            </h4>
            <div className="space-y-2">
              {questionDetail.options.map((opt: string, idx: number) => (
                <div
                  key={idx}
                  className={`p-3 border rounded-lg text-sm ${idx === questionDetail.correctOptionIndex ? "border-green-400 bg-green-50 text-green-900 font-medium" : "border-gray-200 text-gray-700"}`}
                >
                  <span className="inline-block w-6 text-gray-400 font-bold">
                    {String.fromCharCode(65 + idx)}.
                  </span>{" "}
                  {opt}
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">
              Explanation
            </h4>
            <div className="text-sm text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
              {questionDetail.explanation}
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Usage Analytics
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded shadow-sm border border-gray-200 text-center">
                <div className="text-xs text-gray-500 mb-1">Used In</div>
                <div className="font-bold text-navy">{questionDetail.metadata.usageCount}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm border border-gray-200 text-center">
                <div className="text-xs text-gray-500 mb-1">Success</div>
                <div className="font-bold text-green-600">
                  {questionDetail.metadata.successRate}
                </div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm border border-gray-200 text-center">
                <div className="text-xs text-gray-500 mb-1">Avg Time</div>
                <div className="font-bold text-orange-500">{questionDetail.metadata.avgTime}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Action */}
      <div className="p-4 border-t border-gray-200 bg-white shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <button
          onClick={() => toggleSelection(previewId)}
          className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm ${
            isSelected
              ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSelected ? "Remove from Selection" : "Add to Selection Basket"}
        </button>
      </div>
    </aside>
  );
};
