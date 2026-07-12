export const QuestionSearchIndex = {
  SEARCHABLE_FIELDS: ["title", "statement", "explanation", "tags"],
  CLASSIFICATION_FIELDS: ["subject", "topic", "chapter", "category"],
  METADATA_FIELDS: ["difficulty", "type", "language", "source", "status", "authorId"],
} as const;
