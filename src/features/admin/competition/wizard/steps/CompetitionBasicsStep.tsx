"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardStore } from "../context/useWizardStore";
import { competitionBasicsSchema } from "../validators/wizard.validators";
import { CompetitionBasicsData } from "../types/wizard.types";
import { CompetitionType, ExamCategory, ChallengeDifficulty } from "@/generated/prisma";
import { checkSlugAvailability } from "../actions/wizard.actions";
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  onValidationChange: (isValid: boolean) => void;
}

export function CompetitionBasicsStep({ onValidationChange }: Props) {
  const { draftData, updateBasics, setStep, incrementVersion } = useWizardStore();

  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);

  const form = useForm<CompetitionBasicsData>({
    resolver: zodResolver(competitionBasicsSchema),
    defaultValues: {
      title: draftData.basics.title || "",
      slug: draftData.basics.slug || "",
      description: draftData.basics.description || "",
      competitionType: draftData.basics.competitionType || "OPEN_PRACTICE",
      exam: draftData.basics.exam || "SSC",
      language: draftData.basics.language || "English",
      difficulty: draftData.basics.difficulty || "MEDIUM",
    },
    mode: "onChange",
  });

  const {
    formState: { isValid, errors },
    setValue,
    control,
  } = form;
  const watchAll = useWatch({ control });
  const watchAllString = JSON.stringify(watchAll);

  // Expose validation state to parent
  useEffect(() => {
    onValidationChange(isValid && slugAvailable !== false);
  }, [isValid, slugAvailable, onValidationChange]);

  // Debounced Auto-save and Slug Check
  useEffect(() => {
    const timer = setTimeout(async () => {
      const parsedWatchAll = JSON.parse(watchAllString);
      updateBasics(parsedWatchAll);

      // Check slug uniqueness if title/slug changed
      if (parsedWatchAll.slug && parsedWatchAll.slug.length >= 3) {
        setSlugChecking(true);
        try {
          const res = await checkSlugAvailability(parsedWatchAll.slug);
          setSlugAvailable(res.available);
          if (res.suggestions) setSlugSuggestions(res.suggestions);
        } catch (err) {
          console.error(err);
        } finally {
          setSlugChecking(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [watchAllString, updateBasics]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("title", val, { shouldValidate: true });
    // Auto-generate slug if they haven't explicitly started modifying it, or if it's empty
    if (!form.formState.dirtyFields.slug) {
      const genSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", genSlug, { shouldValidate: true });
    }
  };

  const handleNext = () => {
    if (isValid && slugAvailable !== false) {
      incrementVersion(); // force save
      setStep(2);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy">Competition Basics</h2>
        <p className="text-gray-500 text-sm mt-1">
          Start by defining the core identity and category of this competition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("title")}
            onChange={handleTitleChange}
            placeholder="e.g., SSC CGL Mock Test 2024"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex justify-between">
            <span>
              Slug <span className="text-red-500">*</span>
            </span>
            {slugChecking && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" /> Checking...
              </span>
            )}
            {!slugChecking && slugAvailable === true && (
              <span className="text-xs text-green-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Available
              </span>
            )}
            {!slugChecking && slugAvailable === false && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Taken
              </span>
            )}
          </label>
          <input
            {...form.register("slug")}
            placeholder="ssc-cgl-mock-test"
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all
              ${slugAvailable === false ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-orange-500 focus:border-orange-500"}
            `}
          />
          {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}

          {slugAvailable === false && slugSuggestions.length > 0 && (
            <div className="mt-2 p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-xs text-red-600 font-semibold mb-2 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Suggestions:
              </p>
              <div className="flex flex-wrap gap-2">
                {slugSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setValue("slug", s, { shouldValidate: true })}
                    className="text-xs bg-white border border-red-200 text-red-700 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            {...form.register("description")}
            placeholder="Brief description of the competition..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Competition Type</label>
          <select
            {...form.register("competitionType")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
          >
            <option value="OPEN_PRACTICE">Open Practice</option>
            <option value="FREE_CHALLENGE">Free Challenge</option>
            <option value="PAID_CHALLENGE">Paid Challenge</option>
            <option value="MOCK_TEST">Mock Test</option>
            <option value="TOURNAMENT">Tournament</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Exam Category</label>
          <select
            {...form.register("exam")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
          >
            <option value="SSC">SSC</option>
            <option value="BANKING">Banking</option>
            <option value="RAILWAYS">Railways</option>
            <option value="STATE_PSC">State PSC</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Language</label>
          <select
            {...form.register("language")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Bilingual">Bilingual</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Difficulty</label>
          <select
            {...form.register("difficulty")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARDCORE">Hardcore</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={handleNext}
          disabled={!isValid || slugAvailable === false}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm"
        >
          Next Step: Configuration
        </button>
      </div>
    </div>
  );
}
