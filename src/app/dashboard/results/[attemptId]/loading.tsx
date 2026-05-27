export default function ResultsLoading() {
  return (
    <div className="min-h-[80vh] py-8 px-4 animate-pulse">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hero Score Card Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 mx-auto mb-4" />
            <div className="h-8 w-64 bg-gray-100 rounded-lg mx-auto mb-2" />
            <div className="h-4 w-40 bg-gray-100 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="h-9 w-16 bg-gray-100 rounded mx-auto mb-2" />
                <div className="h-3 w-14 bg-gray-100 rounded mx-auto" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-16 bg-gray-50 rounded-xl" />
            <div className="h-16 bg-gray-50 rounded-xl" />
          </div>
        </div>

        {/* Rank Card Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="h-5 w-32 bg-gray-100 rounded mb-4" />
          <div className="h-20 bg-gray-50 rounded-xl" />
        </div>

        {/* Question Review Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="h-5 w-40 bg-gray-100 rounded mb-4" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
