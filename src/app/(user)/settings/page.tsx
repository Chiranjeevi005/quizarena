import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { prisma } from "@/lib/prisma";

import { AccountHero } from "@/components/dashboard/settings/AccountHero";
import { PreparationPreferences } from "@/components/dashboard/settings/PreparationPreferences";
import { SecuritySettings } from "@/components/dashboard/settings/SecuritySettings";
import { SubscriptionSettings } from "@/components/dashboard/settings/SubscriptionSettings";
import { DangerZone } from "@/components/dashboard/settings/DangerZone";

export const metadata = {
  title: "Account Workspace | QuizArena",
  description: "Manage your account identity, security, and active sessions.",
};

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  // Fetch full user details from the database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  // In a real implementation, you'd fetch the actual subscription plan for the user
  const currentPlan = "Free Plan";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-navy mb-2">Account Workspace</h1>
        <p className="text-gray-500">
          Manage your identity, preparation preferences, and subscription in one place.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <AccountHero user={user} subscriptionPlan={currentPlan} />
        </section>

        <section>
          <PreparationPreferences user={user} />
        </section>

        <section>
          <SecuritySettings user={user} />
        </section>

        <section>
          <SubscriptionSettings currentPlan={currentPlan} />
        </section>

        <section>
          <DangerZone />
        </section>
      </div>
    </div>
  );
}
