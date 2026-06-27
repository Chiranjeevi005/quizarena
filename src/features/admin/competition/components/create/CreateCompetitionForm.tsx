"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createCompetitionSchema } from "../../validators/competition.validators";
import { createCompetition } from "../../actions/competition.actions";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";
import { COMPETITION_TYPE_LABELS, EXAM_CATEGORY_LABELS } from "../../models/competition.model";

import { z } from "zod";

type FormData = z.input<typeof createCompetitionSchema>;

export function CreateCompetitionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createCompetitionSchema),
    defaultValues: {
      difficulty: "MEDIUM",
      durationMinutes: 30,
      language: "en",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await createCompetition(data);
      if (result.success && result.competitionId) {
        toast.success("Competition created successfully");
        router.push(ROUTES.ADMIN.COMPETITION_OVERVIEW(result.competitionId));
      } else {
        toast.error(result.error || "Failed to create competition");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          {...register("title")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="e.g. Weekly SSC CGL Mock Test"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Optional)</label>
        <textarea
          {...register("description")}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Brief description of the competition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Competition Type</label>
          <select
            {...register("competitionType")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a type...</option>
            {Object.entries(COMPETITION_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.competitionType && (
            <p className="text-sm text-red-500">{errors.competitionType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Exam Category (Optional)</label>
          <select
            {...register("exam")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">None</option>
            {Object.entries(EXAM_CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Difficulty</label>
          <select
            {...register("difficulty")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARDCORE">Hardcore</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (Minutes)</label>
          <input
            type="number"
            {...register("durationMinutes", { valueAsNumber: true })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.durationMinutes && (
            <p className="text-sm text-red-500">{errors.durationMinutes.message}</p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Competition"}
        </button>
      </div>
    </form>
  );
}
