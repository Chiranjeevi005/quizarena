"use server";

import { CompetitionDraftService } from "../services/CompetitionDraftService";
import { WizardDraftData } from "@/features/admin/competition/wizard/types/wizard.types";

export async function saveCompetitionDraftAction(sessionId: string, userId: string, draftData: WizardDraftData) {
  try {
    const draftService = new CompetitionDraftService();
    const competition = await draftService.saveDraft(sessionId, userId, draftData);
    
    return {
      success: true,
      competitionId: competition.id,
      slug: competition.slug,
    };
  } catch (error) {
    console.error("Failed to save competition draft:", error);
    return {
      success: false,
      error: "Failed to save draft to database.",
    };
  }
}
