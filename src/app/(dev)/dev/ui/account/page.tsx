"use client";
import React, { useState } from "react";
import { AccountProvider } from "@/features/account/providers/AccountProvider";
import { ProfileHealthCard } from "@/features/account/components/profile/ProfileHealthCard";
import { AvatarUploader } from "@/features/account/components/profile/AvatarUploader";
import { ProfileCompletionEngine } from "@/features/account/components/profile/engine/ProfileCompletionEngine";
import { SecurityInformation } from "@/features/account/components/security/SecurityInformation";
import { PasswordManagement } from "@/features/account/components/security/PasswordManagement";
import { ConnectedAccounts } from "@/features/account/components/security/ConnectedAccounts";
import { ActiveSessions } from "@/features/account/components/sessions/ActiveSessions";
import { AppearancePreference } from "@/features/account/components/preferences/AppearancePreference";
import { DangerZone } from "@/features/account/components/danger-zone/DangerZone";
import { AuthProvider } from "@/features/identity";

export default function AccountPlayground() {
  const [demoMode, setDemoMode] = useState(true);

  return (
    <AuthProvider demoMode={demoMode}>
      <AccountProvider>
        <div className="p-8 max-w-5xl mx-auto space-y-12">
          <header className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Enterprise Account Platform</h1>
              <p className="text-muted-foreground mt-1">
                FA-01.3: User Profile & Account Management
              </p>
            </div>
            <button
              className={`px-4 py-2 text-sm font-medium border rounded transition-colors ${!demoMode ? "bg-orange-500 text-white" : "bg-muted"}`}
              onClick={() => setDemoMode(!demoMode)}
            >
              {demoMode ? "Enable Live Supabase Auth" : "Live Mode Active"}
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <ProfileHealthCard className="p-6 border rounded shadow-sm bg-card" />
              <ProfileCompletionEngine className="p-6 border rounded shadow-sm bg-card" />
              <AvatarUploader className="p-6 border rounded shadow-sm bg-card" />
            </div>
            <div className="md:col-span-2 space-y-8">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Security & Access</h2>
                <div className="grid gap-4">
                  <SecurityInformation className="p-6 border rounded shadow-sm bg-card" />
                  <PasswordManagement className="p-6 border rounded shadow-sm bg-card" />
                  <ConnectedAccounts className="p-6 border rounded shadow-sm bg-card" />
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Active Sessions</h2>
                <ActiveSessions className="p-6 border rounded shadow-sm bg-card" />
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Preferences</h2>
                <div className="grid gap-4">
                  <AppearancePreference className="p-6 border rounded shadow-sm bg-card" />
                </div>
              </section>

              <section className="space-y-4 pt-8">
                <DangerZone className="p-6 border border-destructive/50 rounded shadow-sm bg-destructive/5" />
              </section>
            </div>
          </div>
        </div>
      </AccountProvider>
    </AuthProvider>
  );
}
