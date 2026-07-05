"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardStore } from "../context/useWizardStore";
import { competitionConfigSchema } from "../validators/wizard.validators";
import { CompetitionConfigData } from "../types/wizard.types";

interface Props {
  onValidationChange: (isValid: boolean) => void;
}

export function CompetitionConfigurationStep({ onValidationChange }: Props) {
  const { draftData, updateConfig, setStep, incrementVersion } = useWizardStore();

  const form = useForm<CompetitionConfigData>({
    resolver: zodResolver(competitionConfigSchema),
    defaultValues: {
      durationMinutes: draftData.config.durationMinutes || 60,
      passingMarks: draftData.config.passingMarks || 0,
      maximumMarks: draftData.config.maximumMarks || 100,
      negativeMarkingEnabled: draftData.config.negativeMarkingEnabled || false,
      negativeMarkPerQuestion: draftData.config.negativeMarkPerQuestion || 0,
      randomizeQuestions: draftData.config.randomizeQuestions || false,
      randomizeOptions: draftData.config.randomizeOptions || false,
      attemptLimit: draftData.config.attemptLimit || 1,
      reviewAllowed: draftData.config.reviewAllowed ?? true,
      bookmarkAllowed: draftData.config.bookmarkAllowed ?? true,
      sectionNavigation: draftData.config.sectionNavigation || "FREE",
      calculatorAllowed: draftData.config.calculatorAllowed || false,
    },
    mode: "onChange",
  });

  const {
    formState: { isValid, errors },
    register,
    control,
  } = form;
  const watchAll = useWatch({ control });
  const watchAllString = JSON.stringify(watchAll);

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateConfig(watchAll);
    }, 1000);
    return () => clearTimeout(timer);
  }, [watchAllString, updateConfig, watchAll]);

  const handleNext = () => {
    if (isValid) {
      incrementVersion();
      setStep(3);
    }
  };

  const handleBack = () => {
    incrementVersion();
    setStep(1);
  };

  const negativeMarkingEnabled = useWatch({ control, name: "negativeMarkingEnabled" });

  // Helper for Toggle rendering
  const renderToggle = (id: keyof CompetitionConfigData, title: string, description: string) => (
    <div className="flex items-start justify-between p-4 border border-gray-100 rounded-xl bg-white hover:border-orange-200 transition-colors">
      <div className="flex-1 pr-4">
        <h4 className="text-sm font-bold text-navy">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer mt-1">
        <input
          type="checkbox"
          className="sr-only peer"
          {...register(id as keyof CompetitionConfigData)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy">Configuration & Rules</h2>
        <p className="text-gray-500 text-sm mt-1">
          Define how the competition behaves, scoring rules, and player limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Duration (Minutes) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("durationMinutes", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          {errors.durationMinutes && (
            <p className="text-xs text-red-500">{errors.durationMinutes.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Attempt Limit <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("attemptLimit", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          {errors.attemptLimit && (
            <p className="text-xs text-red-500">{errors.attemptLimit.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Maximum Marks <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("maximumMarks", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          {errors.maximumMarks && (
            <p className="text-xs text-red-500">{errors.maximumMarks.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Passing Marks</label>
          <input
            type="number"
            {...register("passingMarks", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          {errors.passingMarks && (
            <p className="text-xs text-red-500">{errors.passingMarks.message}</p>
          )}
        </div>

        {/* Behavior Toggles */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {renderToggle(
            "negativeMarkingEnabled",
            "Negative Marking",
            "Deduct points for incorrect answers"
          )}

          {negativeMarkingEnabled && (
            <div className="flex items-center gap-4 p-4 border border-orange-200 bg-orange-50/50 rounded-xl">
              <div className="flex-1">
                <label className="text-sm font-bold text-orange-900">
                  Penalty per Wrong Answer
                </label>
                <p className="text-xs text-orange-700 mt-1">E.g., 0.25</p>
              </div>
              <input
                type="number"
                step="0.01"
                {...register("negativeMarkPerQuestion", { valueAsNumber: true })}
                className="w-24 px-3 py-2 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          )}

          {renderToggle(
            "randomizeQuestions",
            "Randomize Questions",
            "Shuffle question order for each participant"
          )}
          {renderToggle("randomizeOptions", "Randomize Options", "Shuffle multiple choice options")}
          {renderToggle(
            "reviewAllowed",
            "Allow Review",
            "Participants can mark questions for review"
          )}
          {renderToggle(
            "bookmarkAllowed",
            "Allow Bookmarks",
            "Participants can bookmark questions"
          )}
          {renderToggle(
            "calculatorAllowed",
            "In-app Calculator",
            "Provide a digital calculator during the exam"
          )}

          <div className="flex items-start justify-between p-4 border border-gray-100 rounded-xl bg-white">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-bold text-navy">Section Navigation</h4>
              <p className="text-xs text-gray-500 mt-1">Can users move freely between sections?</p>
            </div>
            <select
              {...register("sectionNavigation")}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white"
            >
              <option value="FREE">Free</option>
              <option value="STRICT">Strict (Locked)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl transition-all shadow-sm"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isValid}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm"
        >
          Next Step: Participation
        </button>
      </div>
    </div>
  );
}
