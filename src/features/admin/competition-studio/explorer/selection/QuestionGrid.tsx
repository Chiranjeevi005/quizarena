"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { searchQuestionsAction } from "../actions/search.actions";
import { QuestionSearchResultDTO } from "../services/SearchScoringEngine";
import { useExplorerStore } from "../stores/useExplorerStore";

/**
 * Question Grid
 *
 * Virtualized rendering for 100k+ questions using @tanstack/react-virtual.
 */
export const QuestionGrid: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { filters, selectionBasket, toggleSelection, previewId, setPreviewId } = useExplorerStore();

  // This state would normally be managed by React Query. For simplicity we use effect.
  const [questions, setQuestions] = useState<QuestionSearchResultDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      setIsLoading(true);
      const res = await searchQuestionsAction(filters);
      if (isMounted && res.success && res.data) {
        setQuestions(res.data);
      }
      if (isMounted) setIsLoading(false);
    };

    // Debounce the fetch slightly to avoid rapid calls on typing
    const timer = setTimeout(fetchQuestions, 300);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [filters]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: questions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90, // estimated height of QuestionRow in px
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-full w-full overflow-auto bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-inner"
    >
      {isLoading && questions.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            Loading questions...
          </div>
        </div>
      ) : questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
          <span className="text-4xl">🔍</span>
          <p>No questions found matching your criteria.</p>
        </div>
      ) : (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const question = questions[virtualRow.index];
            const isSelected = selectionBasket.has(question.id);
            const isPreviewing = previewId === question.id;

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="py-1"
              >
                {/* Question Row Component */}
                <div
                  onClick={() => setPreviewId(question.id)}
                  className={`border rounded p-4 h-full flex items-center justify-between transition-all cursor-pointer group ${
                    isPreviewing
                      ? "bg-blue-50 border-blue-400 shadow-sm ring-1 ring-blue-400"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      {question.title}
                    </span>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span
                        className={`px-1.5 py-0.5 rounded ${question.difficulty === "HARD" ? "bg-red-100 text-red-800" : question.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                      >
                        {question.difficulty}
                      </span>
                      <span>•</span>
                      <span>Usage: {question.usageCount}</span>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">Fit: 96%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(question.id);
                      }}
                      className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                        isSelected
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "opacity-0 group-hover:opacity-100 bg-gray-100 hover:bg-blue-50 text-blue-600"
                      }`}
                    >
                      {isSelected ? "Added to Basket ✓" : "Add to Basket"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
