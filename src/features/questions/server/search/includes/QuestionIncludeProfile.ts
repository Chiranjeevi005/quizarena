import { Prisma } from "@/generated/prisma";

export const QuestionSummaryInclude = {
  revisions: true,
} satisfies Prisma.QuestionInclude;

export const QuestionEditorInclude = {
  revisions: {
    include: {
      chapter: true,
      options: true,
      explanation: true,
      statement: true,
    },
  },
} satisfies Prisma.QuestionInclude;

export const QuestionAnalyticsInclude = {
  revisions: true,
  // Future: analytics: true
} satisfies Prisma.QuestionInclude;

export type QuestionIncludeProfileType =
  | typeof QuestionSummaryInclude
  | typeof QuestionEditorInclude
  | typeof QuestionAnalyticsInclude;
