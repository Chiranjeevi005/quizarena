export enum QuestionType {
  MCQ = "MCQ",
  MSQ = "MSQ",
  TRUE_FALSE = "TRUE_FALSE",
  FILL_BLANK = "FILL_BLANK",
  MATCHING = "MATCHING",
  SEQUENCE = "SEQUENCE",
  ASSERTION_REASON = "ASSERTION_REASON",
  NUMERICAL = "NUMERICAL",
  SUBJECTIVE = "SUBJECTIVE",
  CODING = "CODING",
  CASE_STUDY = "CASE_STUDY",
  COMPREHENSION = "COMPREHENSION",
}

export enum QuestionDifficulty {
  BEGINNER = "BEGINNER",
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  EXPERT = "EXPERT",
}

export enum QuestionLanguage {
  EN = "EN",
  HI = "HI",
  FR = "FR",
  ES = "ES",
  DE = "DE",
}

export enum RevisionStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  READY = "READY",
  PUBLISHED = "PUBLISHED",
  SUPERSEDED = "SUPERSEDED",
  ARCHIVED = "ARCHIVED",
}

export enum QuestionSourceType {
  MANUAL = "MANUAL",
  IMPORT = "IMPORT",
  AI = "AI",
  DUPLICATE = "DUPLICATE",
  MIGRATION = "MIGRATION",
  API = "API",
}

export enum QuestionStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
  LOCKED = "LOCKED",
}

export enum AssetAssignmentType {
  QUESTION = "QUESTION",
  OPTION = "OPTION",
  EXPLANATION = "EXPLANATION",
  HINT = "HINT",
  REFERENCE = "REFERENCE",
}
