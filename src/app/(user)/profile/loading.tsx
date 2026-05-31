/**
 * Profile Loading Skeleton
 *
 * Exactly mirrors the Profile page layout:
 * Title → Profile Card (avatar/info/account details) → Preparation Profile → Info Card
 */
export default function ProfileLoading() {
  return (
    <div className="skeleton-page max-w-3xl mx-auto space-y-6">
      {/* Page Title */}
      <div className="skeleton-shimmer w-36 h-8 rounded-lg" />

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Profile Header — gradient area */}
        <div className="bg-linear-to-r from-primary/10 via-blue-50/50 to-transparent px-6 py-8 sm:px-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="skeleton-shimmer skeleton-circle w-24 h-24 shrink-0" />
            <div className="space-y-3 flex-1">
              {/* Name */}
              <div className="skeleton-shimmer w-48 h-7 rounded-lg mx-auto sm:mx-0" />
              {/* Username */}
              <div className="skeleton-shimmer w-32 h-4 rounded mx-auto sm:mx-0" />
              {/* Badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <div className="skeleton-shimmer w-24 h-6 rounded-full" />
                <div className="skeleton-shimmer w-20 h-6 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="px-6 py-8 sm:px-10">
          <div className="skeleton-shimmer w-40 h-3 rounded mb-6" />
          <div className="grid grid-cols-1 gap-y-6">
            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-6 border-b border-gray-50">
              <div className="flex items-center gap-2 mb-1 sm:mb-0">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-24 h-3.5 rounded" />
              </div>
              <div className="skeleton-shimmer w-44 h-3.5 rounded" />
            </div>
            {/* Full Name */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-6 border-b border-gray-50">
              <div className="flex items-center gap-2 mb-1 sm:mb-0">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-20 h-3.5 rounded" />
              </div>
              <div className="skeleton-shimmer w-36 h-3.5 rounded" />
            </div>
            {/* Account Type */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-2 mb-1 sm:mb-0">
                <div className="skeleton-shimmer w-4 h-4 rounded" />
                <div className="skeleton-shimmer w-24 h-3.5 rounded" />
              </div>
              <div className="skeleton-shimmer w-16 h-3.5 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Preparation Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <div className="skeleton-shimmer w-36 h-3 rounded mb-6" />
          <div className="space-y-6">
            {/* Onboarding Status */}
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              style={{ minHeight: 52 }}
            >
              <div className="flex items-center gap-3">
                <div className="skeleton-shimmer w-5 h-5 rounded" />
                <div className="skeleton-shimmer w-28 h-3.5 rounded" />
              </div>
              <div className="skeleton-shimmer w-20 h-6 rounded-full" />
            </div>
            {/* Exam Category */}
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              style={{ minHeight: 52 }}
            >
              <div className="flex items-center gap-3">
                <div className="skeleton-shimmer w-5 h-5 rounded" />
                <div className="skeleton-shimmer w-24 h-3.5 rounded" />
              </div>
              <div className="skeleton-shimmer w-16 h-3.5 rounded" />
            </div>
            {/* Preparation Level */}
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              style={{ minHeight: 52 }}
            >
              <div className="flex items-center gap-3">
                <div className="skeleton-shimmer w-5 h-5 rounded" />
                <div className="skeleton-shimmer w-32 h-3.5 rounded" />
              </div>
              <div className="skeleton-shimmer w-20 h-3.5 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100" style={{ minHeight: 80 }}>
        <div className="skeleton-shimmer w-36 h-3.5 rounded mb-3" />
        <div className="skeleton-shimmer w-full h-3 rounded" />
        <div className="skeleton-shimmer w-3/4 h-3 rounded mt-2" />
      </div>
    </div>
  );
}
