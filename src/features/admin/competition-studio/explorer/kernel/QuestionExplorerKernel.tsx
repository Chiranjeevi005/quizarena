import React from "react";
import { ModuleRegistry } from "../../studio/registry/ModuleRegistry";
import { useCompetitionStudioContext } from "../../studio/context/CompetitionStudioProvider";

import { QuestionFiltersSidebar } from "../filters/QuestionFiltersSidebar";
import { QuestionGrid } from "../selection/QuestionGrid";
import { QuestionPreviewSidebar } from "../preview/QuestionPreviewSidebar";
import { useExplorerStore } from "../stores/useExplorerStore";

/**
 * Question Explorer Kernel
 *
 * The main module for the Question Explorer Engine.
 * Supports multiple operating modes (Browse, Selection, Replace, etc.)
 */
interface QuestionExplorerKernelProps {
  onReviewSelection?: () => void;
}

export const QuestionExplorerKernel: React.FC<QuestionExplorerKernelProps> = ({ onReviewSelection }) => {
  const { eventBus } = useCompetitionStudioContext();
  const { selectionBasket } = useExplorerStore();

  React.useEffect(() => {
    eventBus.publish("ExplorerOpened");
  }, [eventBus]);

  return (
    <div className="flex h-full w-full bg-white text-gray-900">
      {/* Search and Filters Sidebar */}
      <QuestionFiltersSidebar />

      {/* Main Results Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-14 border-b border-gray-200 flex items-center px-6 shrink-0 bg-white shadow-sm z-10">
          <h3 className="font-medium text-gray-700">Results</h3>
          <div className="ml-auto flex items-center gap-4">
            <a 
              href="/dashboard/admin/question-bank/create" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              Create Question
            </a>
            <div className="text-xs text-gray-500 border-l border-gray-200 pl-4">Mode: Browse</div>
          </div>
        </header>

        {/* Grid Area */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6 relative">
          <div className="w-full max-w-5xl mx-auto h-full pb-16">
            <QuestionGrid />
          </div>
        </div>

        {/* Selection Basket Footer */}
        <footer className="border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-700">
              Selection Basket:{" "}
              <span className="text-blue-600 font-bold">{selectionBasket.size}</span> Items
            </div>
            {selectionBasket.size > 0 && (
              <button
                onClick={() => useExplorerStore.getState().clearSelection()}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Clear Selection
              </button>
            )}
          </div>
          <button
            onClick={onReviewSelection}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={selectionBasket.size === 0}
          >
            Review Selection
          </button>
        </footer>
      </main>

      {/* Preview / Comparison Panel (Right side) */}
      <QuestionPreviewSidebar />
    </div>
  );
};

// Register the module with the Studio Kernel
ModuleRegistry.registerModule({
  id: "question-explorer",
  label: "Explorer",
  icon: "Q", // Placeholder icon character
  component: QuestionExplorerKernel,
});
