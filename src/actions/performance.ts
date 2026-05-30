"use server";

import { prisma } from "@/lib/prisma";
import { AttemptStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

// ============================================================================
// TYPES
// ============================================================================

export interface PerformanceOverview {
  currentStreak: number;
  longestStreak: number;
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number;
  averageAccuracy: number;
  totalAnswered: number;
  strongestCategory: string | null;
  weakestCategory: string | null;
  rank: number | null;
}

export interface TrendDataPoint {
  date: string;
  accuracy: number;
  score: number;
}

export interface WeakArea {
  category: string;
  accuracy: number;
}

export interface CompetitivePosition {
  globalRank: number | null;
  categoryRank: number | null;
  percentile: number;
  weeklyMovement: number;
}

export interface RecentAttempt {
  id: string;
  challengeName: string;
  score: number;
  accuracy: number;
  rankAchieved: number | null;
  submittedAt: Date | null;
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getPerformanceOverview(userId: string): Promise<PerformanceOverview> {
  const profile = await prisma.userPerformanceProfile.findUnique({
    where: { userId },
  });

  // Get current best rank across any category
  const bestRankEntry = await prisma.leaderboardEntry.findFirst({
    where: { userId },
    orderBy: { rank: "asc" },
  });

  if (!profile) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalAttempts: 0,
      completedAttempts: 0,
      averageScore: 0,
      averageAccuracy: 0,
      totalAnswered: 0,
      strongestCategory: null,
      weakestCategory: null,
      rank: bestRankEntry?.rank || null,
    };
  }

  return {
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    totalAttempts: profile.totalAttempts,
    completedAttempts: profile.completedAttempts,
    averageScore: profile.averageScore,
    averageAccuracy: profile.averageAccuracy,
    totalAnswered: profile.totalAnswered,
    strongestCategory: profile.strongestCategory,
    weakestCategory: profile.weakestCategory,
    rank: bestRankEntry?.rank || null,
  };
}

export async function getCategoryAnalytics(userId: string) {
  return prisma.userCategoryPerformance.findMany({
    where: { userId },
    orderBy: { totalAttempts: "desc" },
  });
}

export async function generatePerformanceTrends(
  userId: string,
  days: number = 30
): Promise<TrendDataPoint[]> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const attempts = await prisma.attempt.findMany({
    where: {
      userId,
      status: AttemptStatus.EVALUATED,
      submittedAt: { gte: cutoffDate },
    },
    orderBy: { submittedAt: "asc" },
    select: {
      submittedAt: true,
      score: true,
      correctAnswers: true,
      totalAnswered: true,
    },
  });

  // Group by day (YYYY-MM-DD)
  const grouped = attempts.reduce(
    (acc, curr) => {
      if (!curr.submittedAt) return acc;
      const day = curr.submittedAt.toISOString().split("T")[0];
      if (!acc[day]) {
        acc[day] = { totalScore: 0, totalCorrect: 0, totalAnswered: 0, count: 0 };
      }
      acc[day].totalScore += curr.score;
      acc[day].totalCorrect += curr.correctAnswers;
      acc[day].totalAnswered += curr.totalAnswered || 1; // fallback to 1 to avoid /0
      acc[day].count += 1;
      return acc;
    },
    {} as Record<
      string,
      { totalScore: number; totalCorrect: number; totalAnswered: number; count: number }
    >
  );

  return Object.entries(grouped).map(([date, data]) => ({
    date,
    accuracy: Math.round((data.totalCorrect / data.totalAnswered) * 100),
    score: Math.round(data.totalScore / data.count),
  }));
}

export async function detectWeakAreas(userId: string): Promise<WeakArea[]> {
  const categories = await prisma.userCategoryPerformance.findMany({
    where: {
      userId,
      totalAttempts: { gte: 3 }, // Require at least 3 attempts to establish a pattern
    },
    orderBy: { averageAccuracy: "asc" },
    take: 3,
  });

  return categories
    .filter((cat) => cat.averageAccuracy < 60) // Threshold for weakness
    .map((cat) => ({
      category: cat.category,
      accuracy: Math.round(cat.averageAccuracy),
    }));
}

export async function getCompetitivePosition(userId: string): Promise<CompetitivePosition> {
  // Best rank entry gives us our "Global" best if not filtering by category
  const bestRankEntry = await prisma.leaderboardEntry.findFirst({
    where: { userId },
    orderBy: { rank: "asc" },
  });

  // Calculate approximate percentile based on total users on leaderboard
  let percentile = 0;
  if (bestRankEntry && bestRankEntry.rank > 0) {
    const totalUsers = await prisma.leaderboardEntry.count({
      where: { challengeId: bestRankEntry.challengeId },
    });
    if (totalUsers > 1) {
      percentile = Math.max(0, Math.round(100 - (bestRankEntry.rank / totalUsers) * 100));
    }
  }

  // Placeholder for weekly movement, could be calculated by comparing historical snapshots
  const weeklyMovement = bestRankEntry ? 12 : 0;

  return {
    globalRank: bestRankEntry?.rank || null,
    categoryRank: bestRankEntry?.rank || null, // Mocking category rank as global for now
    percentile,
    weeklyMovement,
  };
}

export async function getRecentAttempts(
  userId: string,
  limit: number = 5
): Promise<RecentAttempt[]> {
  const attempts = await prisma.attempt.findMany({
    where: {
      userId,
      status: AttemptStatus.EVALUATED,
    },
    include: {
      challenge: {
        select: { title: true, totalQuestions: true },
      },
      leaderboardEntry: {
        select: { rank: true },
      },
    },
    orderBy: {
      submittedAt: "desc",
    },
    take: limit,
  });

  return attempts.map((a) => ({
    id: a.id,
    challengeName: a.challenge.title,
    score: a.score,
    accuracy:
      a.totalAnswered > 0 ? Math.round((a.correctAnswers / a.challenge.totalQuestions) * 100) : 0,
    rankAchieved: a.leaderboardEntry?.rank || null,
    submittedAt: a.submittedAt,
  }));
}

// ============================================================================
// WRITE OPERATIONS (DETERMINISTIC STREAKS & AGGREGATIONS)
// ============================================================================

export async function updatePerformanceAggregations(userId: string, attemptId: string) {
  // 1. Fetch the attempt
  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: { challenge: true },
  });

  if (!attempt || attempt.status !== AttemptStatus.EVALUATED || !attempt.submittedAt) {
    return;
  }

  const category = attempt.challenge.category || "GENERAL";

  // 2. Wrap aggregations in a transaction
  await prisma.$transaction(async (tx) => {
    // A. Update or create the profile
    let profile = await tx.userPerformanceProfile.findUnique({
      where: { userId },
    });

    const now = new Date();

    // Default initialization
    if (!profile) {
      profile = await tx.userPerformanceProfile.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastParticipationAt: attempt.submittedAt,
          totalAttempts: 1,
          completedAttempts: 1,
          averageScore: attempt.score,
          averageAccuracy: attempt.totalAnswered
            ? (attempt.correctAnswers / attempt.totalAnswered) * 100
            : 0,
          totalCorrect: attempt.correctAnswers,
          totalAnswered: attempt.totalAnswered,
          strongestCategory: category,
          weakestCategory: null,
        },
      });
    } else {
      // Calculate streak deterministically
      let newStreak = profile.currentStreak;
      if (profile.lastParticipationAt) {
        const msSinceLast = attempt.submittedAt!.getTime() - profile.lastParticipationAt.getTime();
        const hoursSinceLast = msSinceLast / (1000 * 60 * 60);

        if (hoursSinceLast > 24 && hoursSinceLast <= 48) {
          // Continued streak
          newStreak += 1;
        } else if (hoursSinceLast > 48) {
          // Broken streak
          newStreak = 1;
        }
        // If < 24 hours (same day), streak remains the same.
      } else {
        newStreak = 1;
      }

      const newTotalCorrect = profile.totalCorrect + attempt.correctAnswers;
      const newTotalAnswered = profile.totalAnswered + attempt.totalAnswered;
      const newCompleted = profile.completedAttempts + 1;
      const newAccuracy = newTotalAnswered > 0 ? (newTotalCorrect / newTotalAnswered) * 100 : 0;

      // We must recalculate averageScore by querying overall or just doing incremental. Incremental:
      const newAverageScore =
        (profile.averageScore * profile.completedAttempts + attempt.score) / newCompleted;

      profile = await tx.userPerformanceProfile.update({
        where: { userId },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(profile.longestStreak, newStreak),
          lastParticipationAt: attempt.submittedAt,
          totalAttempts: profile.totalAttempts + 1,
          completedAttempts: newCompleted,
          totalCorrect: newTotalCorrect,
          totalAnswered: newTotalAnswered,
          averageAccuracy: newAccuracy,
          averageScore: newAverageScore,
        },
      });
    }

    // B. Update or create the category performance
    const catPerf = await tx.userCategoryPerformance.findUnique({
      where: { userId_category: { userId, category } },
    });

    if (!catPerf) {
      await tx.userCategoryPerformance.create({
        data: {
          userId,
          category,
          totalAttempts: 1,
          averageScore: attempt.score,
          averageAccuracy: attempt.totalAnswered
            ? (attempt.correctAnswers / attempt.totalAnswered) * 100
            : 0,
          totalCorrect: attempt.correctAnswers,
          totalAnswered: attempt.totalAnswered,
          lastAttemptAt: attempt.submittedAt,
        },
      });
    } else {
      const cNewCorrect = catPerf.totalCorrect + attempt.correctAnswers;
      const cNewAnswered = catPerf.totalAnswered + attempt.totalAnswered;
      const cNewCompleted = catPerf.totalAttempts + 1;
      const cNewAccuracy = cNewAnswered > 0 ? (cNewCorrect / cNewAnswered) * 100 : 0;
      const cNewAvgScore =
        (catPerf.averageScore * catPerf.totalAttempts + attempt.score) / cNewCompleted;

      await tx.userCategoryPerformance.update({
        where: { id: catPerf.id },
        data: {
          totalAttempts: cNewCompleted,
          totalCorrect: cNewCorrect,
          totalAnswered: cNewAnswered,
          averageAccuracy: cNewAccuracy,
          averageScore: cNewAvgScore,
          lastAttemptAt: attempt.submittedAt,
        },
      });
    }

    // C. Determine strongest and weakest category after updates
    const allCatPerfs = await tx.userCategoryPerformance.findMany({
      where: { userId },
      orderBy: { averageAccuracy: "desc" },
    });

    if (allCatPerfs.length > 0) {
      const strongest = allCatPerfs[0].category;
      const weakest = allCatPerfs[allCatPerfs.length - 1].category;

      await tx.userPerformanceProfile.update({
        where: { userId },
        data: {
          strongestCategory: strongest,
          weakestCategory: allCatPerfs.length > 1 ? weakest : null, // Only have a weak category if more than 1 category or enough attempts
        },
      });
    }
  });

  revalidatePath("/dashboard/home");
  revalidatePath("/analytics");
}
