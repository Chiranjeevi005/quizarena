import {
  QuestionDifficulty,
  QuestionType,
  RevisionStatus,
} from "@/features/questions/shared/enums/QuestionEnums";

export interface QuestionClassificationFilter {
  subject?: string;
  topic?: string;
  chapter?: string;
  category?: string;
}

export interface QuestionMetadataFilter {
  difficulty?: QuestionDifficulty;
  type?: QuestionType;
  language?: string;
  source?: string;
}

export interface QuestionStatusFilter {
  status?: RevisionStatus;
}

export interface QuestionAuthorFilter {
  authorId?: string;
}

export interface QuestionTagFilter {
  tags?: string[];
  matchAll?: boolean; // If true, must match ALL tags. If false, matches ANY.
}

export interface QuestionDateFilter {
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

export interface QuestionFilterQuery {
  classification?: QuestionClassificationFilter;
  metadata?: QuestionMetadataFilter;
  status?: QuestionStatusFilter;
  author?: QuestionAuthorFilter;
  tags?: QuestionTagFilter;
  dates?: QuestionDateFilter;
}
