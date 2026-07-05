"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { composerSectionSchema, composerQuestionSchema } from "../../validators/wizard.validators";
import { z } from "zod";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComposerQuestionItem } from "./ComposerQuestionItem";
import { useExplorerStore } from "../../../../competition-studio/explorer/stores/useExplorerStore";

type ComposerSection = z.infer<typeof composerSectionSchema>;
type ComposerQuestion = z.infer<typeof composerQuestionSchema>;

interface Props {
  section: ComposerSection;
  onRemove: (sectionId: string) => void;
  onUpdate: (sectionId: string, updates: Partial<ComposerSection>) => void;
  onRemoveQuestion: (sectionId: string, questionId: string) => void;
  onUpdateQuestion: (sectionId: string, questionId: string, updates: Partial<ComposerQuestion>) => void;
}

export const ComposerSectionItem: React.FC<Props> = ({
  section,
  onRemove,
  onUpdate,
  onRemoveQuestion,
  onUpdateQuestion,
}) => {
  const sectionId = section.id || section.title; // fallback
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sectionId, data: { type: "Section", section } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const questionIds = (section.questions || []).map((q: ComposerQuestion) => q.questionId);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border flex flex-col mb-6 shadow-sm transition-all ${isDragging ? "border-navy ring-2 ring-blue-100 z-40" : "border-gray-200"}`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl group">
        <div className="flex items-center gap-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-200 p-1.5 rounded text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>
          </div>
          
          <input 
            type="text" 
            className="text-lg font-bold text-navy bg-transparent border-none focus:ring-0 p-0 w-1/2 focus:outline-none placeholder-gray-400"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => onUpdate(sectionId, { title: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-500">
            {section.questions.length} Questions
          </div>
          
          <button
            onClick={() => {
              const { selectionBasket, clearSelection } = useExplorerStore.getState();
              if (selectionBasket.size === 0) {
                alert("Your Question Explorer basket is empty. Please select questions first.");
                return;
              }

              const newQuestions = Array.from(selectionBasket).map((qId, i) => ({
                questionId: qId,
                displayOrder: section.questions.length + i,
                marks: 1,
                negativeMarks: 0,
                questionWeight: 1.0,
                isOptional: false,
                isBonus: false,
                isMandatory: true,
              }));

              onUpdate(sectionId, {
                questions: [...section.questions, ...newQuestions],
              });
              
              clearSelection();
            }}
            className="px-3 py-1 bg-white border border-gray-200 text-indigo-600 text-xs font-semibold rounded hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Import from Basket
          </button>

          <button
            onClick={() => onRemove(sectionId)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all opacity-0 group-hover:opacity-100"
            title="Remove Section"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Section Content & Questions */}
      <div className="p-4 bg-gray-50/30 rounded-b-xl flex-1">
        <div className="mb-4 text-sm flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input 
              type="checkbox"
              className="rounded text-navy focus:ring-navy"
              checked={section.isMandatory}
              onChange={(e) => onUpdate(sectionId, { isMandatory: e.target.checked })}
            />
            Mandatory Section
          </label>
        </div>

        <div className="space-y-3 min-h-[50px]">
          <SortableContext items={questionIds} strategy={verticalListSortingStrategy}>
            {(section.questions || []).map((question: ComposerQuestion, index: number) => (
              <ComposerQuestionItem 
                key={question.questionId} 
                question={question} 
                index={index}
                onRemove={(qId) => onRemoveQuestion(sectionId, qId)}
                onUpdate={(qId, updates) => onUpdateQuestion(sectionId, qId, updates)}
              />
            ))}
          </SortableContext>
          
          {section.questions.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm bg-white">
              Drag and drop questions here from the Explorer Basket
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
