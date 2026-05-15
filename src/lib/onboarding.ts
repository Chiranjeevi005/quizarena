export const EXAM_CATEGORIES = [
  {
    value: "SSC",
    label: "SSC",
    description: "Staff Selection Commission exams",
  },
  {
    value: "BANKING",
    label: "Banking",
    description: "IBPS, SBI, RBI and other banking exams",
  },
  {
    value: "RAILWAYS",
    label: "Railways",
    description: "Railway Recruitment Board exams",
  },
  {
    value: "STATE_PSC",
    label: "State PSC",
    description: "State Public Service Commission exams",
  },
] as const;

export const PREPARATION_LEVELS = [
  {
    value: "BEGINNER",
    label: "Beginner",
    description: "Just starting out, need to build foundation",
  },
  {
    value: "INTERMEDIATE",
    label: "Intermediate",
    description: "Have some basics covered, want to level up",
  },
  {
    value: "ADVANCED",
    label: "Advanced",
    description: "Ready for high-level practice and speed",
  },
] as const;

export type ExamCategoryValue = (typeof EXAM_CATEGORIES)[number]["value"];
export type PreparationLevelValue = (typeof PREPARATION_LEVELS)[number]["value"];

export const EXAM_CATEGORY_LABELS: Record<ExamCategoryValue, string> = {
  SSC: "SSC",
  BANKING: "Banking",
  RAILWAYS: "Railways",
  STATE_PSC: "State PSC",
};

export const PREPARATION_LEVEL_LABELS: Record<PreparationLevelValue, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function normalizeUsername(username: string): string {
  return username
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_{2,}/g, "_")
    .slice(0, 20);
}

export function generateUsernameSuggestion(name: string | null): string {
  if (!name) return "";
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z]/g, "")
    .slice(0, 12);
  const suffix = Math.floor(Math.random() * 900) + 100;
  return `${base}_${suffix}`;
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username || username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  if (username.length > 20) {
    return { valid: false, error: "Username must be 20 characters or less" };
  }
  if (!/^[a-z][a-z0-9_]*$/.test(username)) {
    return {
      valid: false,
      error: "Username can only contain lowercase letters, numbers, and underscores",
    };
  }
  if (username.startsWith("_") || username.endsWith("_")) {
    return { valid: false, error: "Username cannot start or end with underscore" };
  }
  return { valid: true };
}

export function isValidExamCategory(value: string): value is ExamCategoryValue {
  return EXAM_CATEGORIES.some((cat) => cat.value === value);
}

export function isValidPreparationLevel(value: string): value is PreparationLevelValue {
  return PREPARATION_LEVELS.some((level) => level.value === value);
}
