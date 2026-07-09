import React from "react";
import Link from "next/link";
import { LayoutDashboard, Receipt, Ticket, ShieldAlert, Activity, FileText } from "lucide-react";

interface RevenueWorkspaceKernelProps {
  children: React.ReactNode;
}

export default function RevenueWorkspaceKernel({ children }: RevenueWorkspaceKernelProps) {
  const sidebarLinks = [
    { name: "Dashboard", href: "/revenue/workspace", icon: LayoutDashboard },
    { name: "Orders & Payments", href: "/revenue/workspace/orders", icon: Receipt },
    { name: "Coupons & Pricing", href: "/revenue/workspace/coupons", icon: Ticket },
    { name: "Financial Reports", href: "/revenue/workspace/reports", icon: FileText },
    { name: "Health & Alerts", href: "/revenue/workspace/health", icon: Activity },
    { name: "Audit & Repair", href: "/revenue/workspace/repair", icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-slate-900 text-white">
          <h1 className="text-lg font-semibold">Revenue Workspace</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area - WorkspaceLayoutEngine */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm">
          {/* Breadcrumbs or global actions could go here */}
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-500">Live Mode</span>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
