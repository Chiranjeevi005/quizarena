import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  BuilderHydrationData,
  BuilderState,
  ValidationSummary,
  BuilderSection,
  BuilderQuestion,
  BuilderQuestionConfig,
} from "../types/builder.types";

interface BuilderActions {
  hydrate: (data: BuilderHydrationData) => void;
  setHasLock: (hasLock: boolean) => void;
  setReadOnly: (isReadOnly: boolean) => void;
  setPreviewMode: (isPreview: boolean) => void;

  // Undo/Redo support (simple interface for now)
  undo: () => void;
  redo: () => void;

  // Sections
  addSection: (section: BuilderSection) => void;
  updateSection: (id: string, updates: Partial<BuilderSection>) => void;
  removeSection: (id: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;

  // Questions
  addQuestion: (question: BuilderQuestion) => void;
  updateQuestionConfig: (id: string, config: Partial<BuilderQuestionConfig>) => void;
  removeQuestion: (id: string) => void;
  moveQuestion: (id: string, newSectionId: string, newIndex: number) => void;
}

const emptyValidation: ValidationSummary = {
  blockingErrors: [],
  warnings: [],
  suggestions: [],
};

type StoreType = BuilderState & BuilderActions;

export const useBuilderStore = create<StoreType>()(
  devtools(
    (set, get) => ({
      metadata: null,
      sections: {},
      questions: {},
      sectionOrder: [],

      validation: emptyValidation,
      isValidating: false,

      isPreviewMode: false,
      isLeftPanelOpen: true,
      leftPanelWidth: 30,
      rightPanelWidth: 25,

      hasLock: false,
      isReadOnly: true,

      hydrate: (data) =>
        set({
          metadata: data.metadata,
          sections: data.sections.reduce((acc, sec) => ({ ...acc, [sec.id]: sec }), {}),
          sectionOrder: data.sections.map((s) => s.id),
          questions: data.questions.reduce((acc, q) => ({ ...acc, [q.id]: q }), {}),
          isReadOnly: false,
          hasLock: true,
        }),

      setHasLock: (hasLock) => set({ hasLock }),
      setReadOnly: (isReadOnly) => set({ isReadOnly }),
      setPreviewMode: (isPreviewMode) => set({ isPreviewMode }),

      undo: () => {
        /* To be implemented */
      },
      redo: () => {
        /* To be implemented */
      },

      addSection: (section) =>
        set((state) => ({
          sections: { ...state.sections, [section.id]: section },
          sectionOrder: [...state.sectionOrder, section.id],
        })),

      updateSection: (id, updates) =>
        set((state) => {
          const sec = state.sections[id];
          if (!sec) return state;
          return {
            sections: {
              ...state.sections,
              [id]: { ...sec, ...updates },
            },
          };
        }),

      removeSection: (id) =>
        set((state) => {
          const newSections = { ...state.sections };
          delete newSections[id];
          return {
            sections: newSections,
            sectionOrder: state.sectionOrder.filter((sId) => sId !== id),
          };
        }),

      reorderSections: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.sectionOrder);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { sectionOrder: result };
        }),

      addQuestion: (question) =>
        set((state) => ({
          questions: { ...state.questions, [question.id]: question },
        })),

      updateQuestionConfig: (id, config) =>
        set((state) => {
          const q = state.questions[id];
          if (!q) return state;
          return {
            questions: {
              ...state.questions,
              [id]: { ...q, config: { ...q.config, ...config } },
            },
          };
        }),

      removeQuestion: (id) =>
        set((state) => {
          const newQuestions = { ...state.questions };
          delete newQuestions[id];
          return { questions: newQuestions };
        }),

      moveQuestion: (id, newSectionId, newIndex) =>
        set((state) => {
          const q = state.questions[id];
          if (!q) return state;
          // Basic update - DND logic will need to handle array indices based on current section items
          return {
            questions: {
              ...state.questions,
              [id]: { ...q, sectionId: newSectionId, displayOrder: newIndex },
            },
          };
        }),
    }),
    { name: "BuilderStore" }
  )
);
