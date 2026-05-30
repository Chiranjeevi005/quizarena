/**
 * QuizArena — Settings Page
 *
 * Placeholder for user settings with proper future extensibility.
 * Protected route — requires authentication.
 */
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { User, Bell, CreditCard, Shield, Palette, Globe, ChevronRight, Clock } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  const settingSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Information",
          description: "Update your name, username, and profile picture",
          href: "/profile",
          comingSoon: false,
        },
        {
          icon: Shield,
          label: "Security",
          description: "Password and authentication settings",
          comingSoon: true,
        },
        {
          icon: Globe,
          label: "Language & Region",
          description: "Language, timezone, and regional preferences",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Email and push notification preferences",
          comingSoon: true,
        },
        {
          icon: Palette,
          label: "Display",
          description: "Theme, colors, and UI preferences",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Subscription",
      items: [
        {
          icon: CreditCard,
          label: "Billing & Plan",
          description: "Manage your subscription and payment methods",
          href: "/subscription",
          comingSoon: false,
        },
        {
          icon: Clock,
          label: "Usage History",
          description: "View your subscription and usage history",
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account preferences and settings</p>
      </div>

      {/* Account Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Signed in as</p>
            <p className="text-base font-bold text-navy">{session.user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Account</p>
            <p className="text-base font-bold text-navy capitalize">
              {session.user.role?.toLowerCase() || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {section.title}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`p-4 ${item.href ? "hover:bg-gray-50 cursor-pointer" : ""}`}
                >
                  {item.href && !item.comingSoon ? (
                    <Link href={item.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-navy">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.description}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Sign Out */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Need help? Contact{" "}
          <a href="mailto:support@quizarena.com" className="text-primary hover:underline">
            support@quizarena.com
          </a>
        </p>
      </div>
    </div>
  );
}
