"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/features/rbac/constants/authorization";
import {
  createCompetitionSchema,
  updateBasicsSchema,
  competitionConfigSchema,
  competitionEconomicsSchema,
  competitionEligibilitySchema,
  attachQuestionsSchema,
  transitionStatusSchema,
  createSectionSchema,
} from "../validators/competition.validators";
import { CompetitionService } from "../services/competition.service";
import {
  DEFAULT_COMPETITION_RULES,
  DEFAULT_COMPETITION_ELIGIBILITY,
} from "../models/competition.model";
import { CompetitionStatus } from "@/generated/prisma";

async function logAudit(
  competitionId: string,
  action: any,
  actorId: string,
  previousState?: any,
  newState?: any,
  reason?: string
) {
  await prisma.competitionAudit.create({
    data: {
      competitionId,
      action,
      actorId,
      previousState,
      newState,
      reason,
    },
  });
}

export async function createCompetition(payload: unknown) {
  const user = await requireAdmin();
  if (!user || !user.id) return { success: false, error: "Unauthorized" };
  const parsed = createCompetitionSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  const data = parsed.data;
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  try {
    const competition = await prisma.$transaction(async (tx) => {
      const comp = await tx.competition.create({
        data: {
          title: data.title,
          slug,
          description: data.description,
          competitionType: data.competitionType,
          exam: data.exam,
          difficulty: data.difficulty,
          language: data.language,
          durationMinutes: data.durationMinutes,
          createdById: user.id,
          status: "DRAFT",
        },
      });

      await tx.competitionConfig.create({
        data: {
          competitionId: comp.id,
          rules: DEFAULT_COMPETITION_RULES as any,
        },
      });

      await tx.competitionEconomics.create({
        data: {
          competitionId: comp.id,
        },
      });

      await tx.competitionEligibility.create({
        data: {
          competitionId: comp.id,
          criteria: DEFAULT_COMPETITION_ELIGIBILITY as any,
        },
      });

      await tx.competitionAudit.create({
        data: {
          competitionId: comp.id,
          action: "CREATED",
          actorId: user.id,
          newState: "DRAFT",
        },
      });

      return comp;
    });

    revalidatePath("/dashboard/admin/competitions");
    return { success: true, competitionId: competition.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create competition" };
  }
}

export async function updateCompetitionBasics(payload: unknown) {
  const user = await requireAdmin();
  if (!user || !user.id) return { success: false, error: "Unauthorized" };
  const parsed = updateBasicsSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  const { id, ...data } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.competition.update({
        where: { id },
        data: { ...data, updatedById: user.id },
      });
      await tx.competitionAudit.create({
        data: {
          competitionId: id,
          action: "UPDATED",
          actorId: user.id,
        },
      });
    });

    revalidatePath(`/dashboard/admin/competitions/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update basics" };
  }
}

export async function updateCompetitionConfig(id: string, payload: unknown) {
  const user = await requireAdmin();
  if (!user || !user.id) return { success: false, error: "Unauthorized" };
  const parsed = competitionConfigSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  const data = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      const comp = await tx.competition.update({
        where: { id },
        data: {
          durationMinutes: data.durationMinutes,
          maximumMarks: data.maximumMarks,
          updatedById: user.id,
        },
      });

      await tx.competitionConfig.update({
        where: { competitionId: id },
        data: {
          negativeMarkingEnabled: data.negativeMarkingEnabled,
          negativeMarkPerQuestion: data.negativeMarkPerQuestion,
          passingMarks: data.passingMarks,
          allowRetake: data.allowRetake,
          randomizeQuestions: data.randomizeQuestions,
          randomizeOptions: data.randomizeOptions,
          rules: data.rules as any,
          rulesVersion: { increment: 1 },
        },
      });

      await tx.competitionAudit.create({
        data: {
          competitionId: id,
          action: "RULES_CONFIGURED",
          actorId: user.id,
        },
      });
    });

    revalidatePath(`/dashboard/admin/competitions/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update config" };
  }
}

export async function attachQuestions(payload: unknown) {
  const user = await requireAdmin();
  if (!user || !user.id) return { success: false, error: "Unauthorized" };
  const parsed = attachQuestionsSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  const { competitionId, questionIds } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      const existing = await tx.competitionQuestion.aggregate({
        where: { competitionId },
        _max: { displayOrder: true },
      });

      let nextOrder = (existing._max.displayOrder ?? -1) + 1;

      for (const qId of questionIds) {
        await tx.competitionQuestion.create({
          data: {
            competitionId,
            questionId: qId,
            displayOrder: nextOrder++,
          },
        });
      }

      await tx.competition.update({
        where: { id: competitionId },
        data: { totalQuestions: { increment: questionIds.length } },
      });

      await tx.competitionAudit.create({
        data: {
          competitionId,
          action: "QUESTIONS_ATTACHED",
          actorId: user.id,
        },
      });
    });

    revalidatePath(`/dashboard/admin/competitions/${competitionId}/questions`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to attach questions" };
  }
}

export async function validateAndTransition(payload: unknown) {
  const user = await requireAdmin();
  if (!user || !user.id) return { success: false, error: "Unauthorized" };
  const parsed = transitionStatusSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  const { competitionId, targetStatus, reason } = parsed.data;

  try {
    const comp = await prisma.competition.findUnique({ where: { id: competitionId } });
    if (!comp) return { success: false, error: "Not found" };

    if (targetStatus === "READY") {
      const validation = await CompetitionService.validateCompetition(competitionId);
      if (!validation.valid) {
        return { success: false, error: "Validation failed", details: validation.errors };
      }
      await logAudit(competitionId, "VALIDATED", user.id);
    }

    await prisma.$transaction(async (tx) => {
      await tx.competition.update({
        where: { id: competitionId },
        data: { status: targetStatus, updatedById: user.id },
      });

      await tx.competitionAudit.create({
        data: {
          competitionId,
          action: targetStatus === "READY" ? "MARKED_READY" : "UPDATED",
          actorId: user.id,
          previousState: comp.status,
          newState: targetStatus,
          reason,
        },
      });
    });

    revalidatePath(`/dashboard/admin/competitions/${competitionId}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to transition status" };
  }
}

export async function publishCompetition(id: string, mode: "SCHEDULED" | "LIVE") {
  const user = await requireAdmin();
  if (!user || !user.id) return { success: false, error: "Unauthorized" };

  try {
    const preconditions = await CompetitionService.checkPublishPreconditions(id);
    if (!preconditions.canPublish) {
      return {
        success: false,
        error: "Publish preconditions not met",
        checks: preconditions.checks,
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.competition.update({
        where: { id },
        data: {
          status: mode,
          publishedAt: new Date(),
          updatedById: user.id,
        },
      });

      await tx.competitionAudit.create({
        data: {
          competitionId: id,
          action: mode === "LIVE" ? "WENT_LIVE" : "SCHEDULED",
          actorId: user.id,
          newState: mode,
        },
      });
    });

    revalidatePath(`/dashboard/admin/competitions/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to publish" };
  }
}
