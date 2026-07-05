"use server";

import { AssessmentAnalyticsService } from "../services/AssessmentAnalyticsService";
import { WizardDraftData } from "@/features/admin/competition/wizard/types/wizard.types";

const analyticsService = new AssessmentAnalyticsService();

export async function analyzeCompetitionDraftAction(draftData: WizardDraftData) {
  try {
    const report = await analyticsService.analyzeDraft(draftData);
    return { success: true, data: report };
  } catch (error: any) {
    console.error("Failed to analyze draft:", error);
    return { success: false, error: error.message };
  }
}
