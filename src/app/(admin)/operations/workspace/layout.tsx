import React from "react";

export default function OperationsWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between bg-zinc-900 px-6 py-4 text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-tight">Enterprise Operations Platform</div>
          <div className="rounded bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-100">
            SA-07 Control Center
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto">
          <nav className="space-y-1">
            <NavItem href="/operations/workspace" label="Executive Dashboard" />
            <NavItem href="/operations/workspace/health" label="Platform Health" />
            <NavItem href="/operations/workspace/incidents" label="Incidents" />
            <NavItem href="/operations/workspace/alerts" label="Alerts" />
            <NavItem href="/operations/workspace/workers" label="Workers" />
            <NavItem href="/operations/workspace/scheduler" label="Scheduler" />
            <NavItem href="/operations/workspace/automation" label="Automation" />
            <NavItem href="/operations/workspace/recovery" label="Recovery" />
            <NavItem href="/operations/workspace/diagnostics" label="Diagnostics" />
            <NavItem href="/operations/workspace/dependencies" label="Dependencies" />
            <NavItem href="/operations/workspace/feature-flags" label="Feature Flags" />
            <NavItem href="/operations/workspace/configuration" label="Configuration" />
            <NavItem href="/operations/workspace/capacity" label="Capacity" />
            <NavItem href="/operations/workspace/costs" label="Costs" />
            <NavItem href="/operations/workspace/releases" label="Releases" />
            <NavItem href="/operations/workspace/reports" label="Reports" />
            <NavItem href="/operations/workspace/audit" label="Audit" />
            <NavItem href="/operations/workspace/runbooks" label="Runbooks" />
            <NavItem
              href="/operations/workspace/command-center"
              label="Command Center"
              className="font-bold text-red-600 bg-red-50 mt-4"
            />
            <NavItem href="/operations/workspace/status" label="Status" />
            <NavItem href="/operations/workspace/settings" label="Settings" />
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
