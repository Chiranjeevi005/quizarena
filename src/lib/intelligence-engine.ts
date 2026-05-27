/**
 * Adaptive Performance Intelligence Engine
 * Provides deterministic calculations for strengths, weaknesses, and readiness.
 */

export interface IntelligenceInsight {
  id: string;
  type: "STRENGTH" | "WEAKNESS" | "DISCIPLINE" | "NEUTRAL";
  message: string;
  metric?: string;
  createdAt: Date;
}

export function calculateReadinessScore(
  overallAccuracy: number,
  recentAccuracy: number,
  disciplineIndex: number,
  completedAttempts: number
): number {
  // Base readiness from overall historical accuracy (weighted at 40%)
  const baseScore = (overallAccuracy / 100) * 40;

  // Recent momentum (weighted at 30%)
  const momentum = (recentAccuracy / 100) * 30;

  // Discipline and consistency (weighted at 20%)
  const disciplineScore = (disciplineIndex / 100) * 20;

  // Experience factor (up to 10% bonus for having completed more than 10 challenges)
  const experienceBonus = Math.min((completedAttempts / 10) * 10, 10);

  const total = baseScore + momentum + disciplineScore + experienceBonus;

  // Normalize between 0 and 100
  return Math.max(0, Math.min(100, Math.round(total * 10) / 10));
}

export function evaluateParticipationGaps(
  lastParticipation: Date | null,
  currentGaps: number
): number {
  if (!lastParticipation) return currentGaps;

  const daysSinceLast = Math.floor(
    (new Date().getTime() - lastParticipation.getTime()) / (1000 * 3600 * 24)
  );

  // If inactive for more than 3 days, increment gap counter
  if (daysSinceLast > 3) {
    return currentGaps + 1;
  }
  return currentGaps;
}

export function calculateDisciplineIndex(
  longestStreak: number,
  participationGaps: number,
  totalAttempts: number
): number {
  if (totalAttempts === 0) return 100.0;

  // Start with perfect discipline
  let index = 100.0;

  // Penalize for gaps (e.g., -5 points per gap)
  index -= participationGaps * 5;

  // Reward for long streaks (e.g., +2 points per day in longest streak)
  index += longestStreak * 2;

  return Math.max(0, Math.min(100, Math.round(index * 10) / 10));
}

export function generateDeterministicInsights(
  categoryPerformances: any[],
  difficultyPerformances: any[],
  profile: any
): IntelligenceInsight[] {
  const insights: IntelligenceInsight[] = [];
  const now = new Date();

  // 1. Weakness Insight
  if (profile.weakestCategory) {
    insights.push({
      id: `weak-cat-${now.getTime()}`,
      type: "WEAKNESS",
      message: `Your weakest performance is in ${profile.weakestCategory}. Consider focusing on Beginner challenges in this category to rebuild fundamentals.`,
      createdAt: now,
    });
  }

  // 2. Strength Insight
  if (profile.strongestCategory) {
    const strongCat = categoryPerformances.find((c) => c.category === profile.strongestCategory);
    if (strongCat && strongCat.averageAccuracy > 70) {
      insights.push({
        id: `str-cat-${now.getTime()}`,
        type: "STRENGTH",
        message: `You consistently rank high in ${profile.strongestCategory} with an average accuracy of ${strongCat.averageAccuracy.toFixed(1)}%.`,
        metric: `+${strongCat.averageAccuracy.toFixed(1)}%`,
        createdAt: now,
      });
    }
  }

  // 3. Difficulty Warning
  const hardcore = difficultyPerformances.find((d) => d.difficulty === "HARDCORE");
  if (hardcore && hardcore.totalAttempts > 5 && hardcore.averageAccuracy < 40) {
    insights.push({
      id: `diff-warn-${now.getTime()}`,
      type: "WEAKNESS",
      message: `Hardcore challenge completion consistency is declining (${hardcore.averageAccuracy.toFixed(1)}%). We recommend switching to Medium difficulty temporarily.`,
      createdAt: now,
    });
  }

  // 4. Discipline Insight
  if (profile.participationGaps > 3) {
    insights.push({
      id: `disc-warn-${now.getTime()}`,
      type: "DISCIPLINE",
      message: `Participation frequency dropped recently. You have ${profile.participationGaps} registered inactivity gaps. Maintain a consistent streak to improve readiness.`,
      createdAt: now,
    });
  } else if (profile.currentStreak > 5) {
    insights.push({
      id: `disc-str-${now.getTime()}`,
      type: "STRENGTH",
      message: `Excellent discipline! You are on a ${profile.currentStreak}-day learning streak. Consistency is the key to competitive momentum.`,
      createdAt: now,
    });
  }

  return insights;
}
