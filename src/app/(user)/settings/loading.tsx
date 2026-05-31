/**
 * Settings Loading Skeleton
 *
 * Exactly mirrors the Account Workspace layout:
 * Page Header → Account Hero → Preparation Preferences → Security → Subscription → Danger Zone
 */
export default function SettingsLoading() {
  return (
    <div className="skeleton-page max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="skeleton-shimmer w-56 h-8 rounded-lg mb-2 mx-auto sm:mx-0" />
        <div className="skeleton-shimmer w-80 h-4 rounded mx-auto sm:mx-0" />
      </div>

      <div className="space-y-6">
        {/* SECTION 1: ACCOUNT HERO */}
        <section>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center flex flex-col items-center">
            {/* Avatar */}
            <div className="mb-4 flex items-center justify-center">
              <div className="skeleton-shimmer skeleton-circle w-20 h-20" />
            </div>
            {/* Name */}
            <div className="skeleton-shimmer w-40 h-6 rounded-lg mb-2" />
            {/* Username */}
            <div className="skeleton-shimmer w-28 h-4 rounded mb-4" />
            {/* Badge row */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-5">
              <div className="skeleton-shimmer w-24 h-7 rounded-xl" />
              <div className="skeleton-shimmer w-36 h-7 rounded-xl" />
              <div className="skeleton-shimmer w-28 h-7 rounded-xl" />
            </div>
            {/* CTA */}
            <div className="skeleton-shimmer w-28 h-10 rounded-xl" />
          </div>
        </section>

        {/* SECTION 2: PREPARATION PREFERENCES */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-44 h-5 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-56 h-3.5 rounded" />
                </div>
              </div>
            </div>
            {/* 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Exam */}
              <div className="space-y-3">
                <div className="skeleton-shimmer w-24 h-3.5 rounded" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="skeleton-shimmer h-12 rounded-xl" />
                  ))}
                </div>
              </div>
              {/* Difficulty */}
              <div className="space-y-3">
                <div className="skeleton-shimmer w-36 h-3.5 rounded" />
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton-shimmer h-12 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
            {/* Footer button */}
            <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
              <div className="skeleton-shimmer w-40 h-11 rounded-xl" />
            </div>
          </div>
        </section>

        {/* SECTION 3: SECURITY */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-36 h-5 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-60 h-3.5 rounded" />
                </div>
              </div>
            </div>
            {/* 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 h-20" />
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 h-24" />
            </div>
            {/* Footer */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <div className="skeleton-shimmer w-40 h-11 rounded-xl" />
            </div>
          </div>
        </section>

        {/* SECTION 4: SUBSCRIPTION */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-40 h-5 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-56 h-3.5 rounded" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 h-28" />
          </div>
        </section>

        {/* SECTION 5: DANGER ZONE (collapsed) */}
        <section>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-full flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="skeleton-shimmer w-10 h-10 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-24 h-5 rounded mb-1" />
                  <div className="skeleton-shimmer w-40 h-3 rounded" />
                </div>
              </div>
              <div className="skeleton-shimmer w-5 h-5 rounded" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
