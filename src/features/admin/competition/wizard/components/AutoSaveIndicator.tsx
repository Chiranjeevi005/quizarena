"use client";

import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useWizardAutoSave } from "../hooks/useWizardAutoSave";

export function AutoSaveIndicator() {
  const { savingState } = useWizardAutoSave();

  if (savingState === "idle") return null;

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {savingState === "saving" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
          <span className="text-gray-500">Saving...</span>
        </>
      )}
      {savingState === "saved" && (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-gray-500">Saved to Draft</span>
        </>
      )}
      {savingState === "error" && (
        <>
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-red-500">Save Failed</span>
        </>
      )}
    </div>
  );
}
