/**
 * Settings Loading Skeleton
 *
 * Exactly mirrors the Settings Page layout:
 * Page Header → Notifications & Reminders → Security & Sessions → Billing & Subscription → Account Controls
 */
export default function SettingsLoading() {
  return (
    <div className="skeleton-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="skeleton-shimmer w-40 h-9 rounded-lg mb-2 mx-auto sm:mx-0" />
        <div className="skeleton-shimmer w-96 h-5 rounded mx-auto sm:mx-0" />
      </div>

      <div className="space-y-8">
        {/* SECTION 1: NOTIFICATIONS & REMINDERS */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-56 h-6 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-64 h-4 rounded" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                  <div className="skeleton-shimmer w-48 h-5 rounded" />
                  <div className="skeleton-shimmer w-11 h-6 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: SECURITY */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-48 h-6 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-56 h-4 rounded" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 h-full flex flex-col min-h-[88px]">
                  <div className="skeleton-shimmer w-28 h-5 rounded mb-1" />
                  <div className="flex items-center gap-2 mt-1">
                    <div className="skeleton-shimmer w-32 h-4 rounded" />
                    <div className="skeleton-shimmer w-16 h-5 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 h-full flex items-start gap-4 min-h-[120px]">
                  <div className="skeleton-shimmer w-8 h-8 rounded-lg shrink-0 mt-1" />
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <div className="skeleton-shimmer w-28 h-5 rounded" />
                      <div className="skeleton-shimmer w-12 h-5 rounded-full" />
                    </div>
                    <div className="skeleton-shimmer w-36 h-4 rounded mt-2" />
                    <div className="skeleton-shimmer w-40 h-4 rounded mt-3" />
                    <div className="skeleton-shimmer w-32 h-4 rounded mt-3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center">
              <div className="skeleton-shimmer w-60 h-12 rounded-xl" />
              <div className="skeleton-shimmer w-48 h-12 rounded-xl" />
            </div>
          </div>
        </section>

        {/* SECTION 3: SUBSCRIPTION */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-48 h-6 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-40 h-4 rounded" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="skeleton-shimmer w-28 h-6 rounded-full mb-4" />
                <div className="skeleton-shimmer w-40 h-9 rounded mb-2" />
                <div className="space-y-2 mb-6">
                  <div className="skeleton-shimmer w-full h-4 rounded" />
                  <div className="skeleton-shimmer w-3/4 h-4 rounded" />
                </div>
                <div className="skeleton-shimmer w-36 h-4 rounded mb-4" />
                <div className="space-y-3 mb-8 flex-1">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="skeleton-shimmer w-5 h-5 rounded shrink-0 mt-0.5" />
                      <div className="skeleton-shimmer w-48 h-5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="rounded-xl p-6 h-full flex flex-col border border-gray-100 bg-gray-50/50">
                  <div className="skeleton-shimmer w-36 h-4 rounded mb-4" />
                  <div className="space-y-3 mb-8 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="skeleton-shimmer w-5 h-5 rounded shrink-0 mt-0.5" />
                        <div className="skeleton-shimmer w-56 h-5 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="skeleton-shimmer w-full h-14 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DANGER ZONE */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="skeleton-shimmer w-12 h-12 rounded-xl" />
                <div>
                  <div className="skeleton-shimmer w-40 h-6 rounded mb-1.5" />
                  <div className="skeleton-shimmer w-56 h-4 rounded" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border gap-4 ${i === 3 ? 'bg-red-50/50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="w-full sm:w-auto flex-1">
                    <div className="skeleton-shimmer w-32 h-5 rounded mb-1.5" />
                    <div className="skeleton-shimmer w-64 h-4 rounded" />
                  </div>
                  <div className={`skeleton-shimmer shrink-0 w-36 h-9 rounded-xl`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
