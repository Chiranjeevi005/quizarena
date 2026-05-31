/**
 * Challenges Loading Skeleton
 *
 * Exactly mirrors the Challenges (Practice Arena) page layout:
 * Challenge Hero → Open Practice Grid (8-col) + Invite/History (4-col)
 */
export default function ChallengesLoading() {
  return (
    <div className="skeleton-page min-h-screen bg-gray-50 -m-6 sm:-m-8 p-6 sm:p-8 space-y-12">
      {/* SECTION 1: CHALLENGE HERO */}
      <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center py-8 md:py-10 px-8 md:px-12">
        {/* Subtle grid pattern bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          {/* Badge */}
          <div className="skeleton-shimmer w-32 h-6 rounded-md mb-6" />
          {/* Title */}
          <div className="skeleton-shimmer w-80 md:w-[500px] h-12 md:h-14 rounded-xl mb-8" />
          {/* Stat row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="skeleton-shimmer w-16 h-2.5 rounded" />
                <div className="skeleton-shimmer w-28 h-4 rounded" />
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <div className="skeleton-shimmer w-[260px] h-14 rounded-xl" />
            <div className="skeleton-shimmer w-72 h-3.5 rounded mt-1" />
          </div>
        </div>
      </div>

      {/* SECTION 2+3+4: TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT: Open Practice Challenges (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="skeleton-shimmer w-28 h-5 rounded" />
                  <div className="skeleton-shimmer w-8 h-5 rounded-full" />
                </div>
                <div className="skeleton-shimmer w-56 h-3.5 rounded mt-2" />
              </div>
            </div>
          </div>
          {/* Challenge cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3"
                style={{ minHeight: 160 }}
              >
                <div className="flex items-center justify-between">
                  <div className="skeleton-shimmer w-16 h-5 rounded-full" />
                  <div className="skeleton-shimmer w-12 h-5 rounded-full" />
                </div>
                <div className="skeleton-shimmer w-48 h-5 rounded" />
                <div className="flex items-center gap-3">
                  <div className="skeleton-shimmer w-20 h-3.5 rounded" />
                  <div className="skeleton-shimmer w-20 h-3.5 rounded" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="skeleton-shimmer w-24 h-3 rounded" />
                  <div className="skeleton-shimmer w-28 h-9 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Invites + History (col-span-4) */}
        <div className="lg:col-span-4 space-y-10">
          {/* Challenge With Friends */}
          <div className="space-y-4">
            <div>
              <div className="skeleton-shimmer w-36 h-3 rounded mb-1.5" />
              <div className="skeleton-shimmer w-48 h-2.5 rounded mt-1 mb-2" />
            </div>
            <div
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              style={{ maxHeight: 120 }}
            >
              <div className="flex gap-2">
                <div className="skeleton-shimmer flex-1 h-10 rounded-lg" />
                <div className="skeleton-shimmer w-16 h-10 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Challenge History */}
          <div className="space-y-4">
            <div className="skeleton-shimmer w-32 h-3 rounded" />
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                  <div className="skeleton-shimmer w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="skeleton-shimmer w-32 h-3.5 rounded" />
                    <div className="skeleton-shimmer w-20 h-2.5 rounded" />
                  </div>
                  <div className="skeleton-shimmer w-12 h-7 rounded-lg shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
