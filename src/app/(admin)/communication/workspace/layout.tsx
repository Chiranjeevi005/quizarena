import React from "react";

export default function CommunicationWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between bg-zinc-900 px-6 py-4 text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-tight">Communication Platform</div>
          <div className="rounded bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-100">
            SA-08 Control Center
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto">
          <nav className="space-y-1">
            <NavItem href="/communication/workspace" label="Dashboard" />
            <NavItem href="/communication/workspace/notifications" label="Notifications" />
            <NavItem href="/communication/workspace/inbox" label="Inbox" />
            <NavItem href="/communication/workspace/templates" label="Templates" />
            <NavItem href="/communication/workspace/campaigns" label="Campaigns" />
            <NavItem href="/communication/workspace/announcements" label="Announcements" />
            <NavItem href="/communication/workspace/queue" label="Queue" />
            <NavItem href="/communication/workspace/delivery" label="Delivery" />
            <NavItem href="/communication/workspace/analytics" label="Analytics" />
            <NavItem href="/communication/workspace/providers" label="Providers" />
            <NavItem href="/communication/workspace/preferences" label="Preferences" />
            <NavItem href="/communication/workspace/branding" label="Branding" />
            <NavItem href="/communication/workspace/audit" label="Audit" />
            <NavItem href="/communication/workspace/reports" label="Reports" />
            <NavItem href="/communication/workspace/settings" label="Settings" />
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
