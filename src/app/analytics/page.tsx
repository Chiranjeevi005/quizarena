/**
 * QuizArena — Analytics Page
 *
 * Placeholder scaffolding for future analytics implementation.
 * Protected route — requires authentication.
 */
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Target,
  Flame,
  Award,
  BarChart3,
  PieChart,
  ArrowRight,
} from "lucide-react";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Analytics</h1>
        <p className="text-gray-500">Track your preparation progress and performance insights</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Attempts</p>
          <p className="text-2xl font-bold text-navy">—</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Average Score</p>
          <p className="text-2xl font-bold text-navy">—</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Current Streak</p>
          <p className="text-2xl font-bold text-navy">0 days</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Rank</p>
          <p className="text-2xl font-bold text-navy">—</p>
        </div>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy">Performance Over Time</h2>
            <TrendingUp className="w-5 h-5 text-gray-300" />
          </div>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <BarChart3 className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-base font-semibold text-navy mb-2">
              Performance chart coming soon
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mb-4">
              Your score trends will be visualized here once you attempt your first quiz.
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Start practicing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy">Topic Performance</h2>
            <PieChart className="w-5 h-5 text-gray-300" />
          </div>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <PieChart className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-base font-semibold text-navy mb-2">Topic breakdown coming soon</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-4">
              Your performance by topic and subject will be displayed here.
            </p>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-navy mb-6">Preparation Insights</h2>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-navy mb-2">Insights will appear here</h3>
          <p className="text-sm text-gray-500 max-w-md mb-4">
            Get personalized recommendations based on your performance patterns and preparation
            timeline.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Complete quizzes to unlock insights</span>
          </div>
        </div>
      </div>

      {/* Empty State CTA */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-6 border border-primary/10">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy mb-1">Start tracking your progress</h3>
            <p className="text-sm text-gray-600 mb-3">
              Complete practice quizzes to see your performance analytics and track improvement over
              time.
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
            >
              Browse challenges <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
