import { Prisma } from "@/generated/prisma";

export class QuestionSortSpecification {
  public static NewestFirst(): Prisma.QuestionOrderByWithRelationInput {
    return { createdAt: "desc" };
  }

  public static OldestFirst(): Prisma.QuestionOrderByWithRelationInput {
    return { createdAt: "asc" };
  }

  public static MostRecentlyUpdated(): Prisma.QuestionOrderByWithRelationInput {
    return { updatedAt: "desc" };
  }

  public static DifficultyAscending(): Prisma.QuestionOrderByWithRelationInput {
    // Note: difficulty is on revision. We can't sort by it directly from Question without a specific relation.
    // We'll sort by createdAt as a fallback since Prisma doesn't support sorting by a to-many relation field easily.
    return { createdAt: "asc" };
  }

  public static DifficultyDescending(): Prisma.QuestionOrderByWithRelationInput {
    return { createdAt: "desc" };
  }
}
