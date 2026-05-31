"use client";

import { CreditCard, Sparkles, Check, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface SubscriptionSettingsProps {
  currentPlan?: string;
}

export function SubscriptionSettings({ currentPlan = "Free Plan" }: SubscriptionSettingsProps) {
  const isPremium = currentPlan !== "Free Plan";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-navy" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy tracking-tight">Subscription & Billing</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage your plan and billing preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Col: Plan Status */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-4 border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Active Plan
            </div>

            <h4 className="text-3xl font-black text-navy tracking-tight flex items-center gap-2 mb-2">
              {currentPlan}
              {isPremium && <Sparkles className="w-6 h-6 text-indigo-500" />}
            </h4>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {isPremium
                ? "You have full access to all premium features and exclusive content."
                : "You are currently on the free tier. Upgrade to unlock premium features."}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600">Next billing date</span>
              <span className="font-bold text-navy">{isPremium ? "Oct 12, 2026" : "—"}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Benefits & Action */}
        <div className="md:col-span-7">
          <div
            className={`rounded-xl p-6 h-full flex flex-col ${isPremium ? "bg-indigo-50/50 border border-indigo-100" : "bg-gray-50/50 border border-gray-200/60"}`}
          >
            <h5 className="text-sm font-bold text-navy mb-4 uppercase tracking-wider">
              Included Features
            </h5>

            <div className="space-y-3 mb-8 flex-1">
              {!isPremium ? (
                <>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="font-medium">Limited Challenge Access</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="font-medium">Basic Analytics Access</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="font-medium">Standard National Rankings</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3 text-sm text-navy">
                    <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-bold">Unlimited Challenge Access</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-navy">
                    <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-bold">Advanced AI Analytics Access</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-navy">
                    <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-bold">Premium National Rankings</span>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/subscription"
              className="group flex items-center justify-center gap-2 w-full py-3.5 bg-navy text-white text-sm font-bold rounded-xl hover:bg-gray-900 transition-all hover:shadow-lg shadow-navy/20 active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              Upgrade to Premium
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
