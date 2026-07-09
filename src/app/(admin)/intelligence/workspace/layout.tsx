import React from "react";

export default function IntelligenceWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between bg-emerald-900 px-6 py-4 text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-tight">Platform Intelligence Platform</div>
          <div className="rounded bg-emerald-800 px-2 py-1 text-xs font-medium text-emerald-100">
            SA-06 Command Center
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto">
          <nav className="space-y-1">
            <NavItem href="/intelligence/workspace" label="Executive Dashboard" />
            <NavItem href="/intelligence/workspace/competitions" label="Competitions" />
            <NavItem href="/intelligence/workspace/candidates" label="Candidates" />
            <NavItem href="/intelligence/workspace/smes" label="SMEs" />
            <NavItem href="/intelligence/workspace/revenue" label="Revenue" />
            <NavItem href="/intelligence/workspace/governance" label="Governance" />
            <NavItem href="/intelligence/workspace/operations" label="Operations" />
            <NavItem href="/intelligence/workspace/kpis" label="KPIs" />
            <NavItem href="/intelligence/workspace/insights" label="Insights" />
            <NavItem href="/intelligence/workspace/forecasts" label="Forecasts" />
            <NavItem href="/intelligence/workspace/recommendations" label="Recommendations" />
            <NavItem href="/intelligence/workspace/benchmarks" label="Benchmarks" />
            <NavItem href="/intelligence/workspace/reports" label="Reports" />
            <NavItem href="/intelligence/workspace/data-quality" label="Data Quality" />
            <NavItem href="/intelligence/workspace/settings" label="Settings" />
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${className}`}
    >
      {label}
    </a>
  );
}
