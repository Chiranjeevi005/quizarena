"use server";

import { CompetitionDraftService } from "../services/CompetitionDraftService";
import { WizardDraftData } from "@/features/admin/competition/wizard/types/wizard.types";
import { getCurrentUser } from "@/auth";

export async function saveCompetitionDraftAction(
  sessionId: string,
  _userId: string, // Kept for signature compatibility, but ignored
  draftData: WizardDraftData
) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");
    
    const draftService = new CompetitionDraftService();
    const competition = await draftService.saveDraft(sessionId, user.id, draftData);

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
