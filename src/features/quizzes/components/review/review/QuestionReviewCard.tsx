"use client";
import React from "react";
import { QuestionReviewPresentation } from "../../../review";

interface QuestionReviewCardProps {
  question: QuestionReviewPresentation;
  className?: string;
  headerSlot?: React.ReactNode;
  bodySlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  statusSlot?: React.ReactNode;
  actionSlot?: React.ReactNode;
}

export function QuestionReviewCard({
  question,
  className = "",
  headerSlot,
  bodySlot,
  footerSlot,
  leadingSlot,
  trailingSlot,
  statusSlot,
  actionSlot,
}: QuestionReviewCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col ${className}`}
    >
      {headerSlot && <div className="border-b border-gray-100 p-4">{headerSlot}</div>}
      <div className="p-4 flex gap-4">
        {leadingSlot && <div className="shrink-0 pt-1">{leadingSlot}</div>}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-gray-900 text-lg">
              {question.order}. {question.title}
            </h3>
            {statusSlot && <div className="shrink-0">{statusSlot}</div>}
          </div>
          {bodySlot && <div className="mt-2 text-gray-700">{bodySlot}</div>}
        </div>
        {trailingSlot && <div className="shrink-0 pt-1">{trailingSlot}</div>}
      </div>
      {actionSlot && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
          {actionSlot}
        </div>
      )}
      {footerSlot && (
        <div className="px-4 py-3 bg-white border-t border-gray-100 rounded-b-xl">{footerSlot}</div>
      )}
    </div>
  );
}
