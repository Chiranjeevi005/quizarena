"use client";

import React, { useRef, useEffect } from "react";
import { useExplorerStore } from "../stores/useExplorerStore";
import { ExamCategory } from "@/generated/prisma";

export const QuestionFiltersSidebar: React.FC = () => {
  const { filters, setFilters, clearFilters } = useExplorerStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside className="w-80 border-r border-gray-200 bg-gray-50 p-4 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-navy">Question Explorer</h2>
        <button
          onClick={clearFilters}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Search</label>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search questions (Ctrl+K)"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.query || ""}
          onChange={(e) => setFilters({ query: e.target.value })}
        />
      </div>

      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Filters</h3>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Difficulty
          </label>
          <select
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white"
            value={filters.difficulty || ""}
            onChange={(e) =>
              setFilters({ difficulty: e.target.value ? (e.target.value as any) : undefined })
            }
          >
            <option value="">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Exam Category
          </label>
          <select
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white"
            value={filters.exam || ""}
            onChange={(e) =>
              setFilters({ exam: e.target.value ? (e.target.value as any) : undefined })
            }
          >
            <option value="">All Exams</option>
            {Object.values(ExamCategory).map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mt-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Saved Searches</h3>
        <ul className="text-sm space-y-1 text-gray-600">
          <li className="cursor-pointer hover:text-blue-600 flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-50">
            <span>⭐</span> My Favorites
          </li>
          <li className="cursor-pointer hover:text-blue-600 flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-50">
            <span>🔥</span> Popular / High Health
          </li>
          <li className="cursor-pointer hover:text-blue-600 flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-50">
            <span>🕒</span> Recently Added
          </li>
        </ul>
      </div>
    </aside>
  );
};
