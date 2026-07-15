"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

export default function CreateCompetition() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    competitionType: "EXAM",
    durationMinutes: 60,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/competitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          durationMinutes: Number(formData.durationMinutes),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create competition");
      }

      router.push("/admin/competitions");
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/competitions">
          <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Competition</h1>
          <p className="text-gray-400 mt-1">
            Configure a new tournament or exam for your candidates.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3 text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-[#121214] border border-gray-800/60 rounded-2xl overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Competition Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g., Summer Coding Championship"
                className="w-full bg-[#0A0A0B] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="e.g., summer-coding-2024"
                className="w-full bg-[#0A0A0B] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Competition Type</label>
              <div className="relative">
                <select
                  value={formData.competitionType}
                  onChange={(e) => setFormData({ ...formData, competitionType: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none"
                >
                  <option value="EXAM">Exam</option>
                  <option value="HACKATHON">Hackathon</option>
                  <option value="TOURNAMENT">Tournament</option>
                  <option value="PRACTICE">Practice</option>
                  <option value="SCHOLARSHIP">Scholarship</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Duration (Minutes)</label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={(e) =>
                  setFormData({ ...formData, durationMinutes: Number(e.target.value) })
                }
                required
                min="1"
                className="w-full bg-[#0A0A0B] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Provide a brief overview of the competition..."
              className="w-full bg-[#0A0A0B] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-gray-800/60 flex items-center justify-end space-x-4">
            <Link href="/admin/competitions">
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] active:scale-95"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Competition
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
