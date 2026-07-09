import React from "react";

export default function DevUILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 p-4">
        <h1 className="text-xl font-bold text-slate-900">QuizArena Design System</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col gap-2">
          <nav className="flex flex-col gap-2">
            <a href="/dev/ui" className="text-blue-600 hover:underline">
              Overview
            </a>
            <a href="/dev/ui/tokens" className="text-slate-600 hover:underline">
              Tokens
            </a>
            <a href="/dev/ui/icons" className="text-slate-600 hover:underline">
              Icons
            </a>
            <a href="/dev/ui/components" className="text-slate-600 hover:underline">
              Components
            </a>
            <a href="/dev/ui/forms" className="text-slate-600 hover:underline">
              Forms
            </a>
            <a href="/dev/ui/charts" className="text-slate-600 hover:underline">
              Charts
            </a>
            <a href="/dev/ui/tables" className="text-slate-600 hover:underline">
              Tables
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
