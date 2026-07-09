"use client";

import React, { useState } from "react";
import { UniversalPageTemplate } from "../../../super-admin/components/layout/UniversalPageTemplate";
import { IdentityOverviewDashboard } from "../../../features/identity/components/dashboard/IdentityOverviewDashboard";

export default function IdentityOperationsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <UniversalPageTemplate
      title="Identity Operations Platform"
      description="Enterprise identity, access, and governance management."
    >
      <div className="flex border-b border-gray-800 mb-6 space-x-6">
        {["overview", "users", "roles", "permissions", "sessions", "audit"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "overview" && <IdentityOverviewDashboard workspaceId="default" />}
        {activeTab !== "overview" && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-xl font-semibold text-gray-300 capitalize">{activeTab} Module</h2>
            <p className="mt-2 text-sm max-w-md text-center">
              The {activeTab} operational workspace is fully architected via Read Models and
              Facades. UI tables and bulk actions for this module will be implemented progressively.
            </p>
          </div>
        )}
      </div>
    </UniversalPageTemplate>
  );
}
