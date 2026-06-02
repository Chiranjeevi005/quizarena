/**
 * Profile Loading Skeleton
 *
 * Exactly mirrors the new Profile page layout:
 * ProfileHero → PreparationPreferences → CompetitiveRecord → BadgeCollection → RecentActivity
 */
export default function ProfileLoading() {
  return (
    <div className="skeleton-page max-w-6xl mx-auto space-y-6">
      {/* 1. Profile Hero Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gray-50"></div>
        <div className="relative px-6 py-8 sm:px-10 pt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            <div className="skeleton-shimmer skeleton-circle w-[120px] h-[120px] shrink-0 border-4 border-white shadow-sm" />

            <div className="flex-1 space-y-3 w-full mt-2 sm:mt-0">
              <div className="space-y-1.5">
                <div className="skeleton-shimmer w-48 h-8 rounded-lg mx-auto sm:mx-0" />
                <div className="skeleton-shimmer w-32 h-4 rounded mx-auto sm:mx-0" />
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                <div className="skeleton-shimmer w-24 h-6 rounded-full" />
                <div className="skeleton-shimmer w-20 h-6 rounded-full" />
                <div className="skeleton-shimmer w-20 h-6 rounded-full" />
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 mt-4">
                <div className="skeleton-shimmer w-32 h-4 rounded" />
                <div className="w-1 h-1 bg-gray-200 rounded-full hidden sm:block"></div>
                <div className="skeleton-shimmer w-28 h-4 rounded" />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-6 sm:mt-0">
              <div className="skeleton-shimmer w-full sm:w-[90px] h-10 rounded-xl" />
              <div className="skeleton-shimmer w-full sm:w-[130px] h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Preparation Preferences Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <div className="skeleton-shimmer w-4 h-4 rounded" />
          <div className="skeleton-shimmer w-48 h-3 rounded uppercase" />
        </div>
        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-36 h-4 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton-shimmer h-[48px] rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-40 h-4 rounded" />
              </div>
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-shimmer h-[48px] rounded-xl" />
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-36 h-4 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-shimmer h-[48px] rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-48 h-4 rounded" />
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between h-[76px]">
                <div className="space-y-1.5 w-full">
                  <div className="skeleton-shimmer w-40 h-4 rounded" />
                  <div className="skeleton-shimmer w-56 h-3 rounded" />
                </div>
                <div className="skeleton-shimmer w-11 h-6 rounded-full shrink-0" />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <div className="skeleton-shimmer w-48 h-12 rounded-xl" />
          </div>
        </div>
      </div>

      {/* 3. Competitive Record Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <div className="skeleton-shimmer w-4 h-4 rounded" />
          <div className="skeleton-shimmer w-40 h-3 rounded" />
        </div>
        {/* Content */}
        <div className="p-6 flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 content-start">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 h-[72px]"
            >
              <div className="space-y-1.5 w-full">
                <div className="skeleton-shimmer w-20 h-3 rounded" />
                <div className="skeleton-shimmer w-12 h-6 rounded" />
              </div>
              <div className="skeleton-shimmer w-8 h-8 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Badge Collection Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <div className="skeleton-shimmer w-4 h-4 rounded" />
          <div className="skeleton-shimmer w-36 h-3 rounded" />
          <span className="text-gray-200 mx-1">•</span>
          <div className="skeleton-shimmer w-24 h-3 rounded" />
        </div>
        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 h-40 bg-gray-50/30"
            >
              <div className="skeleton-shimmer w-12 h-12 rounded-full mb-3" />
              <div className="skeleton-shimmer w-28 h-4 rounded mb-1" />
              <div className="mt-auto skeleton-shimmer w-16 h-5 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Activity Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="skeleton-shimmer w-4 h-4 rounded" />
            <div className="skeleton-shimmer w-32 h-3 rounded" />
          </div>
          <div className="skeleton-shimmer w-20 h-3 rounded hidden sm:block" />
        </div>
        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-0 md:before:translate-x-5 before:h-full before:w-[2px] before:bg-gray-100">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative flex items-start gap-4 z-10">
                <div className="skeleton-shimmer w-10 h-10 rounded-full border-4 border-white shrink-0" />
                <div className="pt-1 flex-1 bg-white space-y-1.5 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1">
                    <div className="skeleton-shimmer w-56 h-4 rounded" />
                    <div className="skeleton-shimmer w-20 h-5 rounded" />
                  </div>
                  <div className="skeleton-shimmer w-32 h-4 rounded mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
