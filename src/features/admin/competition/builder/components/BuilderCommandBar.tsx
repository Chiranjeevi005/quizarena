"use client";

import { useBuilderStore } from "../context/useBuilderStore";
import {
  Undo,
  Redo,
  Search,
  Eye,
  Play,
  CheckCircle2,
  Save,
  History,
  Lock,
  EyeOff,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function BuilderCommandBar() {
  const { isPreviewMode, setPreviewMode, isReadOnly, hasLock } = useBuilderStore();
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  // In a real implementation, we would tie this to the actual batch save mechanism
  useEffect(() => {
    // mock auto-save indicator logic
  }, []);

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Undo / Redo */}
        <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
          <button
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
            disabled
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
            disabled
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Lock Status */}
        <div className="flex items-center gap-2">
          {hasLock ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Edit Lock Acquired
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              <EyeOff className="w-3 h-3" /> Read Only
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Auto-save Status */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium border-r border-gray-200 pr-4">
          {saveStatus === "SAVED" && (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> All changes saved
            </>
          )}
          {saveStatus === "SAVING" && (
            <>
              <Save className="w-3.5 h-3.5 text-blue-500 animate-pulse" /> Saving...
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            <History className="w-4 h-4" />
            History
          </button>
          <button
            onClick={() => setPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${isPreviewMode ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreviewMode ? "Exit Preview" : "Preview"}
          </button>
        </div>
      </div>
    </div>
  );
}
