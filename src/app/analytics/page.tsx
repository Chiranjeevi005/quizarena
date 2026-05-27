import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  Flame,
  Award,
  BarChart3,
  PieChart,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  getPerformanceOverview,
  generatePerformanceTrends,
  getCategoryAnalytics,
  detectWeakAreas,
} from "@/actions/performance";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  const userId = session.user.id;
  const performance = await getPerformanceOverview(userId);
  const trends = await generatePerformanceTrends(userId, 30);
  const categoryStats = await getCategoryAnalytics(userId);
  const weakAreas = await detectWeakAreas(userId);

  const hasHistory = performance.totalAttempts > 0;

  // Find max accuracy in trends to scale bars
  const maxTrendAccuracy = 100; // Always scale to 100%

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Performance Intelligence</h1>
        <p className="text-gray-500">Track your preparation consistency and competitive growth</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 relative z-10">
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1 relative z-10">Total Attempts</p>
          <p className="text-2xl font-bold text-navy relative z-10">
            {performance.totalAttempts || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          {hasHistory && (
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-100 rounded-full blur-2xl opacity-50"></div>
          )}
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4 relative z-10">
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1 relative z-10">Overall Accuracy</p>
          <p className="text-2xl font-bold text-navy relative z-10">
            {hasHistory ? `${Math.round(performance.averageAccuracy)}%` : "—%"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          {performance.currentStreak > 0 && (
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-100 rounded-full blur-2xl opacity-50"></div>
          )}
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4 relative z-10">
            <Flame
              className={`w-5 h-5 ${performance.currentStreak > 0 ? "text-orange-500" : "text-orange-300"}`}
            />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1 relative z-10">Current Streak</p>
          <p className="text-2xl font-bold text-navy relative z-10">
            {performance.currentStreak} days
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          {performance.rank && (
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-100 rounded-full blur-2xl opacity-50"></div>
          )}
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4 relative z-10">
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1 relative z-10">Global Rank</p>
          <p className="text-2xl font-bold text-navy relative z-10">
            {performance.rank ? `#${performance.rank}` : "—"}
          </p>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Analytics (Native HTML/CSS Bars) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy">Accuracy Trends (30 Days)</h2>
            <Activity className="w-5 h-5 text-gray-300" />
          </div>

          {trends.length > 0 ? (
            <div className="h-64 flex items-end gap-2 md:gap-4 justify-between pt-4 pb-2 border-b border-gray-100">
              {trends.slice(-14).map((trend, i) => (
                <div key={i} className="flex flex-col items-center flex-1 group">
                  <div className="w-full relative flex items-end justify-center h-48 bg-gray-50 rounded-t border border-gray-100">
                    <div
                      className="w-full bg-primary/80 group-hover:bg-primary transition-all rounded-t"
                      style={{ height: `${(trend.accuracy / maxTrendAccuracy) * 100}%` }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[10px] px-2 py-1 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                        {trend.accuracy}%
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-2 rotate-45 md:rotate-0 origin-left">
                    {new Date(trend.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center h-64">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-base font-semibold text-navy mb-2">Not enough data</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Take challenges over multiple days to see your growth visualized here.
              </p>
            </div>
          )}
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy">Category Intelligence</h2>
            <PieChart className="w-5 h-5 text-gray-300" />
          </div>

          {categoryStats.length > 0 ? (
            <div className="space-y-5">
              {categoryStats.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-navy">{cat.category}</span>
                    <span className="text-gray-500 font-medium">
                      {Math.round(cat.averageAccuracy)}% acc
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.averageAccuracy > 75 ? "bg-green-500" : cat.averageAccuracy > 50 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${Math.round(cat.averageAccuracy)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{cat.totalAttempts} attempts</span>
                    <span>
                      {cat.totalCorrect}/{cat.totalAnswered} correct
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <PieChart className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-base font-semibold text-navy mb-2">No category data yet</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Category strengths and weaknesses will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Weakness Engine Insights */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-navy">Vulnerability Report</h2>
        </div>

        {weakAreas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weakAreas.map((weak, i) => (
              <div
                key={i}
                className="bg-red-50/50 border border-red-100 rounded-xl p-5 flex flex-col items-start gap-2"
              >
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  High Risk
                </span>
                <h3 className="text-base font-bold text-navy">{weak.category}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Accuracy is critically low at{" "}
                  <span className="font-bold text-red-600">{weak.accuracy}%</span>. Recommended deep
                  revision.
                </p>
                <Link
                  href={`/challenges?category=${weak.category}`}
                  className="text-primary text-sm font-semibold hover:underline mt-auto"
                >
                  Practice {weak.category} &rarr;
                </Link>
              </div>
            ))}
          </div>
        ) : hasHistory ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-green-50/50 border border-green-100 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-navy mb-1">
              Solid Performance Across the Board
            </h3>
            <p className="text-sm text-gray-500 max-w-md">
              We haven&apos;t detected any critical weaknesses across your attempted categories.
              Keep practicing to maintain consistency.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-gray-200 rounded-xl">
            <h3 className="text-base font-semibold text-navy mb-2">Insufficient Data</h3>
            <p className="text-sm text-gray-500 max-w-md">
              Complete at least 3 challenges in a category to unlock vulnerability reports.
            </p>
          </div>
        )}
      </div>

      {/* Empty State CTA (if no history) */}
      {!hasHistory && (
        <div className="bg-linear-to-r from-primary/5 to-blue-50 rounded-2xl p-6 border border-primary/10">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy mb-1">Start tracking your progress</h3>
              <p className="text-sm text-gray-600 mb-3">
                Complete practice quizzes to see your performance analytics and track improvement
                over time.
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
      )}
    </div>
  );
}
