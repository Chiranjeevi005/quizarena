/**
 * QuizArena — Dashboard Home
 * Competitive Preparation Operating System
 */
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { EXAM_CATEGORY_LABELS, PREPARATION_LEVEL_LABELS } from "@/lib/onboarding";
import Link from "next/link";
import {
  Target,
  GraduationCap,
  Clock,
  Flame,
  Play,
  TrendingUp,
  TrendingDown,
  Brain,
  AlertTriangle,
  Activity,
  History,
  ChevronRight,
  Zap,
  BarChart3,
} from "lucide-react";

export default async function DashboardHomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  const user = session.user;
  const examCategory = user.examCategory as keyof typeof EXAM_CATEGORY_LABELS | undefined;
  const prepLevel = user.preparationLevel as keyof typeof PREPARATION_LEVEL_LABELS | undefined;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8">
      {/* TODAY'S PREPARATION COMMAND CENTER - Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy/90 rounded-2xl p-5 sm:p-6 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Greeting & Context */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-white/50" />
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  {getGreeting()} •{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                Welcome back, {user.name?.split(" ")[0] || "Aspirant"}
              </h1>

              {examCategory && (
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/70 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    {EXAM_CATEGORY_LABELS[examCategory]}
                  </span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {PREPARATION_LEVEL_LABELS[prepLevel || "BEGINNER"]}
                  </span>
                </div>
              )}

              <p className="text-sm text-white/50 max-w-md">
                Your preparation dashboard. Complete daily challenges to build momentum.
              </p>
            </div>

            {/* Right: Primary CTA - Start Today's Challenge */}
            <div className="flex-shrink-0">
              <Link
                href="/challenges"
                className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5" />
                Start Today&apos;s Challenge
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 1 — PRIMARY ACTION: Today's Challenge */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-5 sm:p-6 border border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Today&apos;s Competitive Challenge</h2>
              <p className="text-sm text-gray-500">
                15 questions • 20 minutes • {examCategory || "Mixed Topics"}
              </p>
            </div>
          </div>
          <Link
            href="/challenges"
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
          >
            View all challenges <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <Link
          href="/challenges"
          className="block w-full bg-white hover:bg-gray-50 rounded-xl p-4 border border-gray-100 transition-all duration-200 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-navy mb-1">Ready to attempt today&apos;s challenge?</p>
              <p className="text-sm text-gray-500">
                Test your knowledge and track your national percentile ranking.
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <Play className="w-5 h-5 text-primary group-hover:text-white" />
            </div>
          </div>
        </Link>
      </div>

      {/* LEVEL 2 — PERFORMANCE STATUS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Discipline Streak */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <Flame className="w-4.5 h-4.5 text-orange-500" />
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mb-1">Discipline Streak</p>
          <p className="text-xl font-bold text-navy">
            0 <span className="text-sm font-medium text-gray-400">days</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Start your streak today</p>
        </div>

        {/* National Percentile */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-purple-500" />
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
              Pending
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mb-1">National Percentile</p>
          <p className="text-xl font-bold text-navy">—</p>
          <p className="text-xs text-gray-400 mt-1">Complete challenges to rank</p>
        </div>

        {/* Accuracy */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Target className="w-4.5 h-4.5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
              Pending
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mb-1">Accuracy Stability</p>
          <p className="text-xl font-bold text-navy">—%</p>
          <p className="text-xs text-gray-400 mt-1">Track after first attempt</p>
        </div>

        {/* Preparation Momentum */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
              Pending
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mb-1">Preparation Momentum</p>
          <p className="text-xl font-bold text-navy">—</p>
          <p className="text-xs text-gray-400 mt-1">Build with consistent practice</p>
        </div>
      </div>

      {/* LEVEL 3 — PREPARATION INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weakness Detection */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Weakness Detection</h3>
              <p className="text-xs text-gray-500">AI-powered topic analysis</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Brain className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm font-medium text-navy mb-1">Analysis pending</p>
            <p className="text-xs text-gray-400 max-w-xs">
              Your weak-topic analysis, error patterns, and revision priority recommendations will
              appear after your first challenge.
            </p>
          </div>
        </div>

        {/* Recommended Focus Area */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Recommended Focus Area</h3>
              <p className="text-xs text-gray-500">Personalized preparation</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center">
            <TrendingDown className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm font-medium text-navy mb-1">Focus area pending</p>
            <p className="text-xs text-gray-400 max-w-xs">
              Your subject vulnerability insights, improvement signals, and targeted practice
              recommendations will appear after completing challenges.
            </p>
          </div>
        </div>
      </div>

      {/* LEVEL 4 — HISTORY & ACTIVITY */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <History className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Recent Attempts</h3>
              <p className="text-xs text-gray-500">Your practice history</p>
            </div>
          </div>
          <Link href="/analytics" className="text-xs font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
            <History className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-navy mb-1">No challenges attempted yet</p>
          <p className="text-xs text-gray-400 max-w-sm mb-4">
            Your percentile movement, accuracy trends, and weak-topic analysis will appear after
            your first challenge.
          </p>
          <Link
            href="/challenges"
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
          >
            Attempt your first challenge <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
