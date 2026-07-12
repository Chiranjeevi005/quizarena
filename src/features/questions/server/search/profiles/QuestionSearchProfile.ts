import { QuestionIncludeProfileType } from "../includes/QuestionIncludeProfile";
import { Prisma } from "@/generated/prisma";

export interface QuestionSearchProfile {
  defaultSort: Prisma.QuestionOrderByWithRelationInput;
  allowedIncludes: QuestionIncludeProfileType;
  allowedFilters: string[]; // List of permitted filter keys
}
