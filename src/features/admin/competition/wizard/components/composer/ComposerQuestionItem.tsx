"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { composerQuestionSchema } from "../../validators/wizard.validators";
import { z } from "zod";

type ComposerQuestion = z.infer<typeof composerQuestionSchema>;

interface Props {
  question: ComposerQuestion;
  index: number;
  onRemove: (questionId: string) => void;
  onUpdate: (questionId: string, updates: Partial<ComposerQuestion>) => void;
}

export const ComposerQuestionItem: React.FC<Props> = ({ question, index, onRemove, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: question.questionId,
    data: { type: "Question", question },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-3 flex flex-col gap-3 shadow-sm relative group ${isDragging ? "border-blue-400 z-50 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:bg-gray-100 p-1 rounded text-gray-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 flex items-center gap-2 truncate">
            <span className="text-gray-400 font-mono text-xs border border-gray-200 bg-gray-50 px-1 rounded">
              Q{index + 1}
            </span>
            {question.questionId /* In reality we'd fetch or map the question title */}
          </div>
        </div>

        <button
          onClick={() => onRemove(question.questionId)}
          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-all"
          title="Remove Question"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="pl-9 pr-2 grid grid-cols-4 gap-4 text-xs bg-gray-50 p-2 rounded border border-gray-100">
        <div>
          <label className="block text-gray-500 font-medium mb-1">Marks</label>
          <input
            type="number"
            min="1"
            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            value={question.marks}
            onChange={(e) =>
              onUpdate(question.questionId, { marks: parseInt(e.target.value) || 1 })
            }
          />
        </div>
        <div>
          <label className="block text-gray-500 font-medium mb-1">Neg. Marks</label>
          <input
            type="number"
            min="0"
            step="0.25"
            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            value={question.negativeMarks}
            onChange={(e) =>
              onUpdate(question.questionId, { negativeMarks: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
        <div>
          <label className="block text-gray-500 font-medium mb-1">Type</label>
          <select
            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            value={question.isMandatory ? "mandatory" : "optional"}
            onChange={(e) =>
              onUpdate(question.questionId, { isMandatory: e.target.value === "mandatory" })
            }
          >
            <option value="mandatory">Mandatory</option>
            <option value="optional">Optional</option>
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input
              type="checkbox"
              className="rounded text-blue-600 focus:ring-blue-500"
              checked={question.isBonus}
              onChange={(e) => onUpdate(question.questionId, { isBonus: e.target.checked })}
            />
            Bonus
          </label>
        </div>
      </div>
    </div>
  );
};
