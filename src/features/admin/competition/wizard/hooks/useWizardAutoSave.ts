"use client";

import { useEffect, useRef, useState } from "react";
import { useWizardStore } from "../context/useWizardStore";
import { saveCompetitionDraftAction } from "@/competitions/actions/draft.actions";

export function useWizardAutoSave() {
  const { draftData, sessionId } = useWizardStore();
  const [savingState, setSavingState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSavingState("saving");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        // Assume userId is fetched from session or passed down. For now we use a placeholder or system user.
        // In a real app, the server action can get the session from next-auth.
        const res = await saveCompetitionDraftAction(sessionId, "mock-user-id", draftData);
        if (res.success) {
          setSavingState("saved");
        } else {
          setSavingState("error");
        }
      } catch (e) {
        setSavingState("error");
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [draftData, sessionId]);

  return { savingState, hasUnsavedChanges: false, concurrentEditDetected: false };
}

