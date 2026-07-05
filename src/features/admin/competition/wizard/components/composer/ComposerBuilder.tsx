"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useWizardStore } from "../../context/useWizardStore";
import { ComposerSectionItem } from "./ComposerSectionItem";
import { composerSectionSchema, composerQuestionSchema } from "../../validators/wizard.validators";
import { z } from "zod";

type ComposerSection = z.infer<typeof composerSectionSchema>;
type ComposerQuestion = z.infer<typeof composerQuestionSchema>;

export const ComposerBuilder: React.FC = () => {
  const { draftData, updateComposer } = useWizardStore();
  const sections = draftData.composer?.sections || [];

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddSection = () => {
    const newSectionId = `section-${Date.now()}`;
    const newSection: ComposerSection = {
      title: `New Section ${sections.length + 1}`,
      slug: newSectionId,
      displayOrder: sections.length,
      totalQuestions: 0,
      maximumMarks: 0,
      isMandatory: true,
      allowNavigation: true,
      questions: [],
    };

    updateComposer({ sections: [...sections, newSection] });
  };

  const handleRemoveSection = (sectionId: string) => {
    updateComposer({
      sections: sections.filter((s) => s.slug !== sectionId && s.title !== sectionId),
    });
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<ComposerSection>) => {
    updateComposer({
      sections: sections.map((s) => 
        (s.slug === sectionId || s.title === sectionId) ? { ...s, ...updates } : s
      ),
    });
  };

  const handleRemoveQuestion = (sectionId: string, questionId: string) => {
    updateComposer({
      sections: sections.map((s) => {
        if (s.slug === sectionId || s.title === sectionId) {
          return {
            ...s,
            questions: s.questions.filter((q) => q.questionId !== questionId),
          };
        }
        return s;
      }),
    });
  };

  const handleUpdateQuestion = (sectionId: string, questionId: string, updates: Partial<ComposerQuestion>) => {
    updateComposer({
      sections: sections.map((s) => {
        if (s.slug === sectionId || s.title === sectionId) {
          return {
            ...s,
            questions: s.questions.map((q) => 
              q.questionId === questionId ? { ...q, ...updates } : q
            ),
          };
        }
        return s;
      }),
    });
  };

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      // Find if we are reordering sections
      const oldIndex = sections.findIndex((s) => s.slug === active.id || s.title === active.id);
      const newIndex = sections.findIndex((s) => s.slug === over.id || s.title === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        updateComposer({ sections: arrayMove(sections, oldIndex, newIndex) });
        return;
      }

      // If we are reordering questions within a section...
      // (Cross-section drag-and-drop requires multiple SortableContexts and a different onDragOver logic. 
      // For MVP, we stick to intra-section sorting)
      sections.forEach((section) => {
        const qOldIndex = section.questions.findIndex((q) => q.questionId === active.id);
        const qNewIndex = section.questions.findIndex((q) => q.questionId === over.id);
        
        if (qOldIndex !== -1 && qNewIndex !== -1) {
          handleUpdateSection(section.slug || section.title, {
            questions: arrayMove(section.questions, qOldIndex, qNewIndex),
          });
        }
      });
    }
  };

  const sectionIds = sections.map((s) => s.slug || s.title);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Assessment Structure</h3>
        <button
          type="button"
          onClick={handleAddSection}
          className="px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
          <div className="text-gray-400 text-5xl mb-4">📝</div>
          <h4 className="text-gray-700 font-semibold mb-2">No Sections Yet</h4>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Start by adding a section. A competition needs at least one section to hold questions.
          </p>
          <button
            type="button"
            onClick={handleAddSection}
            className="px-5 py-2.5 bg-white border border-gray-200 text-navy font-semibold rounded-lg shadow-sm hover:border-gray-300 transition-all text-sm"
          >
            Create First Section
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {sections.map((section) => (
                <ComposerSectionItem
                  key={section.slug || section.title}
                  section={section}
                  onRemove={handleRemoveSection}
                  onUpdate={handleUpdateSection}
                  onRemoveQuestion={handleRemoveQuestion}
                  onUpdateQuestion={handleUpdateQuestion}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
