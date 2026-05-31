/**
 * Analytics Loading Skeleton
 *
 * Mirrors the Performance Coach "Intelligence Locked" empty state
 * to prevent massive layout shifts for new users.
 */
export default function AnalyticsLoading() {
  return (
    <div className="skeleton-page max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <div className="skeleton-shimmer w-56 h-8 rounded-lg mb-2" />
        <div className="skeleton-shimmer w-96 h-5 rounded-lg" />
      </div>

      {/* Empty State Box */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center relative overflow-hidden flex flex-col items-center">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-50/50 to-gray-100/30" />
        
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Lock Icon Box */}
          <div className="w-16 h-16 bg-gray-50 rounded-2xl mb-6 shadow-sm border border-gray-100 flex items-center justify-center">
            <div className="skeleton-shimmer w-8 h-8 rounded-lg" />
          </div>
          
          {/* Title */}
          <div className="skeleton-shimmer w-48 h-7 rounded-lg mb-4" />
          
          {/* Description Lines */}
          <div className="skeleton-shimmer w-full max-w-md h-4 rounded mx-auto mb-2" />
          <div className="skeleton-shimmer w-[80%] max-w-sm h-4 rounded mx-auto mb-8" />
          
          {/* Button */}
          <div className="skeleton-shimmer w-[220px] h-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
