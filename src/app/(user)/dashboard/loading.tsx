/**
 * Dashboard Loading Skeleton
 *
 * Exactly mirrors the UserDashboard layout:
 * Hero → Getting Started → Preparation Snapshot → Ranking Position → Recent Performance → Focus Area
 */
export default function DashboardLoading() {
  return (
    <div className="skeleton-page max-w-[1600px] mx-auto space-y-6 md:space-y-8">
      {/* 1. HERO SECTION (Empty State Variant) */}
      <div className="arena-hero rounded-2xl p-6 md:p-8 lg:p-10" style={{ minHeight: 240 }}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="skeleton-shimmer-dark w-3.5 h-3.5 rounded-full" />
              <div className="skeleton-shimmer-dark w-32 h-6 rounded-full" />
            </div>
            <div className="skeleton-shimmer-dark w-64 md:w-80 h-10 md:h-11 rounded-xl" />
            <div className="flex flex-wrap items-center gap-2.5">
              {[104, 104, 128, 136].map((w, i) => (
                <div key={i} className="skeleton-shimmer-dark rounded-lg h-[26px]" style={{ width: w }} />
              ))}
            </div>
          </div>
          <div className="shrink-0 mt-4 lg:mt-0">
            <div className="skeleton-shimmer-dark w-full lg:w-[192px] h-[52px] rounded-xl" />
          </div>
        </div>
      </div>

      {/* 2. GETTING STARTED */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="skeleton-shimmer w-3.5 h-3.5 rounded" />
            <div className="skeleton-shimmer w-28 h-4 rounded" />
          </div>
          <div className="skeleton-shimmer w-36 h-4 rounded" />
        </div>
        <div className="skeleton-shimmer w-full h-1.5 rounded-full mb-6" />
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {[140, 190, 150, 160].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="skeleton-shimmer w-5 h-5 rounded-full shrink-0" />
              <div className="skeleton-shimmer h-4 rounded" style={{ width: w }} />
            </div>
          ))}
        </div>
      </div>

      {/* 3. PREPARATION SNAPSHOT (Locked State) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="skeleton-shimmer w-3.5 h-3.5 rounded" />
          <div className="skeleton-shimmer w-40 h-4 rounded" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton-shimmer w-24 h-3 rounded" />
                <div className="skeleton-shimmer w-5 h-5 rounded" />
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="skeleton-shimmer w-4 h-4 rounded" />
                  <div className="skeleton-shimmer w-14 h-4 rounded" />
                </div>
                <div className="skeleton-shimmer w-40 h-3 rounded mt-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RANKING POSITION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="skeleton-shimmer w-3.5 h-3.5 rounded" />
            <div className="skeleton-shimmer w-28 h-4 rounded" />
          </div>
          <div className="flex items-center gap-1">
            <div className="skeleton-shimmer w-24 h-3.5 rounded" />
            <div className="skeleton-shimmer w-3 h-3 rounded" />
          </div>
        </div>
        <div className="arena-glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between md:flex-col md:items-start md:justify-center p-6 md:p-8">
                <div className="skeleton-shimmer-dark w-24 h-3 rounded mb-0 md:mb-4" />
                <div className="skeleton-shimmer-dark w-10 md:w-16 h-8 md:h-12 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. RECENT PERFORMANCE (Empty State - usually not shown if no attempts, but keeping structure matched) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="skeleton-shimmer w-3.5 h-3.5 rounded" />
            <div className="skeleton-shimmer w-36 h-4 rounded" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center h-[140px]">
           <div className="skeleton-shimmer w-10 h-10 rounded-xl mb-3" />
           <div className="skeleton-shimmer w-40 h-4 rounded mb-1" />
           <div className="skeleton-shimmer w-56 h-3 rounded" />
        </div>
      </div>

      {/* 6. FOCUS AREA (Locked State) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="skeleton-shimmer w-3.5 h-3.5 rounded" />
          <div className="skeleton-shimmer w-24 h-4 rounded" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <div className="skeleton-shimmer w-10 h-10 rounded-xl mb-3" />
          <div className="skeleton-shimmer w-16 h-4 rounded mb-2" />
          <div className="skeleton-shimmer w-56 h-3 rounded" />
        </div>
      </div>
    </div>
  );
}
