"use client";

import { useBuilderStore } from "../../context/useBuilderStore";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowRight,
  Activity,
  ShieldAlert,
  Zap,
} from "lucide-react";

export function CompetitionSummaryPanel() {
  const { questions, sections, validation, metadata } = useBuilderStore();

  const totalQuestions = Object.keys(questions).length;
  const totalMarks = Object.values(questions).reduce((sum, q) => sum + q.config.marks, 0);
  const totalSections = Object.keys(sections).length;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-bold text-gray-800">Summary & Validation</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Live Metrics */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
            Live Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-2xl font-black text-gray-800">{totalQuestions}</div>
              <div className="text-xs font-bold text-gray-500">Questions</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-2xl font-black text-orange-600">{totalMarks}</div>
              <div className="text-xs font-bold text-gray-500">Total Marks</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-2xl font-black text-gray-800">{totalSections}</div>
              <div className="text-xs font-bold text-gray-500">Sections</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-2xl font-black text-gray-800">
                ~{Math.round(totalQuestions * 1.5)}m
              </div>
              <div className="text-xs font-bold text-gray-500">Est. Duration</div>
            </div>
          </div>
        </div>

        {/* Validation: Blocking Errors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Blocking Errors ({validation.blockingErrors.length})
            </h3>
          </div>
          {validation.blockingErrors.length === 0 ? (
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center gap-2 text-sm text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No blocking errors
            </div>
          ) : (
            <div className="space-y-2">
              {validation.blockingErrors.map((err, i) => (
                <div
                  key={i}
                  className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 font-medium"
                >
                  {err}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Validation: Warnings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Warnings ({validation.warnings.length})
            </h3>
          </div>
          {validation.warnings.length === 0 ? (
            <div className="text-sm text-gray-400 italic px-2">No warnings</div>
          ) : (
            <div className="space-y-2">
              {validation.warnings.map((warn, i) => (
                <div
                  key={i}
                  className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-700 font-medium"
                >
                  {warn}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Validation: Suggestions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-blue-500" />
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Suggestions ({validation.suggestions.length})
            </h3>
          </div>
          {validation.suggestions.length === 0 ? (
            <div className="text-sm text-gray-400 italic px-2">No suggestions</div>
          ) : (
            <div className="space-y-2">
              {validation.suggestions.map((sug, i) => (
                <div
                  key={i}
                  className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 font-medium"
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          disabled={validation.blockingErrors.length > 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Mark as Ready
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
