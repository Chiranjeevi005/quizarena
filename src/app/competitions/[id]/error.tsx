"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function CompetitionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real beta setup, we would send this to Sentry or a telemetry service
    console.error("Beta Testing Arena Error Captured:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#121214] border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Arena Disconnected</h1>
          <p className="text-gray-400 mb-8 text-sm">
            We encountered an unexpected error while evaluating your session. Don&apos;t worry, your
            progress is automatically saved every 30 seconds.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reconnect & Resume
            </button>
            <Link href="/dashboard">
              <button className="w-full inline-flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-200 border border-gray-800">
                <Home className="w-4 h-4 mr-2" />
                Return to Dashboard
              </button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800/60 text-xs text-gray-500 font-mono text-left bg-black/50 p-3 rounded-lg overflow-auto">
            <div>Error ID: {error.digest || "unknown-digest"}</div>
            <div className="mt-1 opacity-50 truncate">{error.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
