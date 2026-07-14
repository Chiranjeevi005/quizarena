import { prisma } from "@/lib/prisma";
import {
  CompetitionConfig,
  CompetitionEconomics,
  CompetitionEligibility,
  CompetitionSection,
  CompetitionQuestion,
  Prisma,
} from "@/generated/prisma";

export class ManagementRepository {
  // ─── Config ──────────────────────────────────────────

  async getConfig(competitionId: string): Promise<CompetitionConfig | null> {
    return prisma.competitionConfig.findUnique({
      where: { competitionId },
    });
  }

  async upsertConfig(
    competitionId: string,
    data: Prisma.CompetitionConfigUpdateInput
  ): Promise<CompetitionConfig> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { competition: _comp, ...rest } = data as Prisma.CompetitionConfigCreateInput & { competition?: unknown };
    return prisma.competitionConfig.upsert({
      where: { competitionId },
      update: data,
      create: {
        competition: { connect: { id: competitionId } },
        ...rest,
      },
    });
  }

  // ─── Economics ───────────────────────────────────────

  async getEconomics(
    competitionId: string
  ): Promise<CompetitionEconomics | null> {
    return prisma.competitionEconomics.findUnique({
      where: { competitionId },
    });
  }

  async upsertEconomics(
    competitionId: string,
    data: Prisma.CompetitionEconomicsUpdateInput
  ): Promise<CompetitionEconomics> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { competition: _comp, ...rest } = data as Prisma.CompetitionEconomicsCreateInput & { competition?: unknown };
    return prisma.competitionEconomics.upsert({
      where: { competitionId },
      update: data,
      create: {
        competition: { connect: { id: competitionId } },
        ...rest,
      },
    });
  }

  // ─── Eligibility ────────────────────────────────────

  async getEligibility(
    competitionId: string
  ): Promise<CompetitionEligibility | null> {
    return prisma.competitionEligibility.findUnique({
      where: { competitionId },
    });
  }

  async upsertEligibility(
    competitionId: string,
    data: Prisma.CompetitionEligibilityUpdateInput
  ): Promise<CompetitionEligibility> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { competition: _comp, ...rest } = data as Prisma.CompetitionEligibilityCreateInput & { competition?: unknown };
    return prisma.competitionEligibility.upsert({
      where: { competitionId },
      update: data,
      create: {
        competition: { connect: { id: competitionId } },
        ...rest,
      },
    });
  }

  // ─── Sections ───────────────────────────────────────

  async getSections(competitionId: string): Promise<CompetitionSection[]> {
    return prisma.competitionSection.findMany({
      where: { competitionId },
      orderBy: { displayOrder: "asc" },
    });
  }

  async createSection(
    competitionId: string,
    data: Omit<Prisma.CompetitionSectionCreateWithoutCompetitionInput, "questions">
  ): Promise<CompetitionSection> {
    return prisma.competitionSection.create({
      data: {
        ...data,
        competition: { connect: { id: competitionId } },
      },
    });
  }

  // ─── Questions ──────────────────────────────────────

  async getQuestions(competitionId: string): Promise<CompetitionQuestion[]> {
    return prisma.competitionQuestion.findMany({
      where: { competitionId },
      orderBy: { displayOrder: "asc" },
    });
  }

  async addQuestion(
    competitionId: string,
    data: {
      questionId: string;
      sectionId?: string;
      displayOrder?: number;
      marks?: number;
      negativeMarks?: number;
      isOptional?: boolean;
      isBonus?: boolean;
    }
  ): Promise<CompetitionQuestion> {
    return prisma.competitionQuestion.create({
      data: {
        competition: { connect: { id: competitionId } },
        question: { connect: { id: data.questionId } },
        ...(data.sectionId
          ? { section: { connect: { id: data.sectionId } } }
          : {}),
        displayOrder: data.displayOrder ?? 0,
        marks: data.marks ?? 1,
        negativeMarks: data.negativeMarks ?? 0,
        isOptional: data.isOptional ?? false,
        isBonus: data.isBonus ?? false,
      },
    });
  }
}

export const managementRepository = new ManagementRepository();
