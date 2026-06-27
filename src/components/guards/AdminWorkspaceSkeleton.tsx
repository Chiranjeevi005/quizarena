import React from "react";

export function AdminWorkspaceSkeleton() {
  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="flex-1 py-6 px-4 space-y-4">
          <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse"></div>
          <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse"></div>
          <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse"></div>
          <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse"></div>
          <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse"></div>
          <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Skeleton */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Page Content Skeleton */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="h-8 w-64 bg-slate-200 rounded animate-pulse mb-8"></div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse"
                ></div>
              ))}
            </div>

            {/* Large content area */}
            <div className="h-96 bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse mt-8"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
