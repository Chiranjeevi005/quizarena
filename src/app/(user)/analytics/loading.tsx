/**
 * Analytics Loading Skeleton
 *
 * Matches the Performance Intelligence System Phase 10.1.6B layout:
 * Hero → Priority Focus → Strength/Weakness List → Sparkline → Action Center → Momentum Footer
 */
export default function AnalyticsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-pulse">
      {/* Page Header */}
      <div>
        <div className="h-7 w-48 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-72 bg-gray-100 rounded-lg" />
      </div>

      {/* SECTION 1: HERO */}
      <div className="bg-[#1b2234] rounded-3xl p-8 h-48 relative overflow-hidden" />

      {/* SECTION 2: PRIORITY FOCUS */}
      <div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 justify-between h-40" />
      </div>


      {/* SECTION 4: JOURNEY */}
      <div>
        <div className="h-4 w-44 bg-gray-200 rounded mb-3" />
        <div className="bg-white rounded-2xl border border-gray-100 h-32" />
      </div>

      {/* SECTION 5: ACTION CENTER */}
      <div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24" />
          ))}
        </div>
      </div>

    </div>
  );
}
