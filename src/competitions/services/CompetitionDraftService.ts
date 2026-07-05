import { prisma } from "@/lib/prisma";
import { WizardDraftData } from "@/features/admin/competition/wizard/types/wizard.types";
import {
  CompetitionType,
  ExamCategory,
  ChallengeDifficulty,
  CompetitionVisibility,
} from "@/generated/prisma";

export class CompetitionDraftService {
  /**
   * Saves the current wizard draft state to the database.
   * If a competition with the sessionId (or draftId) doesn't exist, it creates one with defaults.
   */
  async saveDraft(sessionId: string, userId: string, draftData: WizardDraftData) {
    const { basics, config, participation } = draftData;

    // We use the sessionId to track the draft if we don't have an ID yet,
    // but Prisma Competition doesn't have a 'sessionId' field.
    // Instead, we can look up by slug if basics.slug is provided, or create a temporary slug.

    const slug = basics?.slug || `draft-${sessionId}`;
    const title = basics?.title || "Untitled Competition";

    const dataToSave = {
      title,
      slug,
      description: basics?.description || "",
      competitionType: basics?.competitionType || CompetitionType.OPEN_PRACTICE, // fallback
      exam: basics?.exam || ExamCategory.SSC, // fallback
      difficulty: basics?.difficulty || ChallengeDifficulty.MEDIUM, // fallback
      language: basics?.language || "en",
      durationMinutes: config?.durationMinutes || 60,
      totalQuestions: 0,
      maximumMarks: config?.maximumMarks || 0,
      lifecycleState: "DRAFT" as const,
      createdById: userId,
      updatedById: userId,
      visibility: participation?.visibility || CompetitionVisibility.PRIVATE,
      startsAt: participation?.startsAt ? new Date(participation.startsAt) : null,
      endsAt: participation?.endsAt ? new Date(participation.endsAt) : null,
    };

    // Upsert the competition based on slug
    const competition = await prisma.competition.upsert({
      where: { slug },
      update: dataToSave,
      create: dataToSave,
    });

    const extendedRules = {
      attemptLimit: config?.attemptLimit || 1,
      reviewAllowed: config?.reviewAllowed || true,
      bookmarkAllowed: config?.bookmarkAllowed || true,
      sectionNavigation: config?.sectionNavigation || "FREE",
      calculatorAllowed: config?.calculatorAllowed || false,
    };

    // Save nested config if needed
    await prisma.competitionConfig.upsert({
      where: { competitionId: competition.id },
      update: {
        passingMarks: config?.passingMarks || 0,
        negativeMarkingEnabled: config?.negativeMarkingEnabled || false,
        negativeMarkPerQuestion: config?.negativeMarkPerQuestion || 0,
        randomizeQuestions: config?.randomizeQuestions || false,
        randomizeOptions: config?.randomizeOptions || false,
        allowRetake: participation?.allowRetake || false,
        rules: extendedRules,
      },
      create: {
        competitionId: competition.id,
        passingMarks: config?.passingMarks || 0,
        negativeMarkingEnabled: config?.negativeMarkingEnabled || false,
        negativeMarkPerQuestion: config?.negativeMarkPerQuestion || 0,
        randomizeQuestions: config?.randomizeQuestions || false,
        randomizeOptions: config?.randomizeOptions || false,
        allowRetake: participation?.allowRetake || false,
        rules: extendedRules,
      },
    });

    // Sync Composer Sections and Questions
    if (draftData.composer?.sections) {
      // For Draft auto-saving, we will use a transaction to clear and recreate sections
      // based on the client state to avoid complex diffing logic during the draft phase.
      // (In a frozen competition, this is strictly forbidden)

      await prisma.$transaction(async (tx) => {
        // Clear existing sections (cascades to questions)
        await tx.competitionSection.deleteMany({
          where: { competitionId: competition.id },
        });

        // Recreate sections and their questions
        for (const [sIdx, section] of (draftData.composer?.sections || []).entries()) {
          const createdSection = await tx.competitionSection.create({
            data: {
              competitionId: competition.id,
              title: section.title,
              slug: section.slug || `sec-${sIdx}-${Date.now()}`,
              description: section.description,
              instructions: section.instructions,
              displayOrder: section.displayOrder ?? sIdx,
              durationMinutes: section.durationMinutes,
              totalQuestions: section.totalQuestions || section.questions?.length || 0,
              maximumMarks: section.maximumMarks || 0,
              passingMarks: section.passingMarks,
              isMandatory: section.isMandatory ?? true,
              allowNavigation: section.allowNavigation ?? true,
            },
          });

          if (section.questions && section.questions.length > 0) {
            await tx.competitionQuestion.createMany({
              data: section.questions.map((q, qIdx) => ({
                competitionId: competition.id,
                sectionId: createdSection.id,
                questionId: q.questionId,
                displayOrder: q.displayOrder ?? qIdx,
                marks: q.marks ?? 1,
                negativeMarks: q.negativeMarks ?? 0,
                questionWeight: q.questionWeight ?? 1.0,
                isOptional: q.isOptional ?? false,
                isBonus: q.isBonus ?? false,
                isMandatory: q.isMandatory ?? true,
              })),
            });
          }
        }
      });
    }

    return competition;
  }
}
