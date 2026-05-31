"use client";

import { useState, useTransition } from "react";
import { BookOpen, Target, Save } from "lucide-react";
import type { User as PrismaUser, ExamCategory, PreparationLevel } from "@/generated/prisma";
import toast from "react-hot-toast";
import { updatePreferencesAction } from "@/actions/account";

interface PreparationPreferencesProps {
  user: PrismaUser;
}

export function PreparationPreferences({ user }: PreparationPreferencesProps) {
  const [isPending, startTransition] = useTransition();
  const [examCategory, setExamCategory] = useState<ExamCategory | "">(user.examCategory || "");
  const [preparationLevel, setPreparationLevel] = useState<PreparationLevel | "">(
    user.preparationLevel || ""
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updatePreferencesAction({
          examCategory: (examCategory as ExamCategory) || undefined,
          preparationLevel: (preparationLevel as PreparationLevel) || undefined,
        });
        if (result.success) {
          toast.success("Preferences updated successfully");
        } else {
          toast.error("Failed to update preferences");
        }
      } catch (error) {
        toast.error("Failed to update preferences");
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-navy" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy tracking-tight">Preparation Preferences</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Configure your target exams and difficulty
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="flex text-sm font-bold text-gray-700 items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              Target Exam
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "SSC", label: "SSC" },
                { value: "BANKING", label: "Banking" },
                { value: "RAILWAYS", label: "Railways" },
                { value: "STATE_PSC", label: "State PSC" },
              ].map((exam) => (
                <button
                  key={exam.value}
                  type="button"
                  onClick={() => setExamCategory(exam.value as ExamCategory)}
                  className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                    examCategory === exam.value
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-100 bg-gray-50 text-gray-600 hover:border-green-200"
                  }`}
                >
                  {exam.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex text-sm font-bold text-gray-700 items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              Difficulty Preference
            </label>
            <div className="flex flex-col gap-3">
              {[
                { value: "BEGINNER", label: "Beginner" },
                { value: "INTERMEDIATE", label: "Medium" },
                { value: "ADVANCED", label: "Hardcore" },
              ].map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setPreparationLevel(level.value as PreparationLevel)}
                  className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all text-left flex justify-between items-center ${
                    preparationLevel === level.value
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-100 bg-gray-50 text-gray-600 hover:border-green-200"
                  }`}
                >
                  {level.label}
                  {preparationLevel === level.value && (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:text-navy hover:border-gray-300 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Updating..." : "Update Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
