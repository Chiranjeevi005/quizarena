import { create } from "zustand";
import { QuestionSearchFilters } from "../repositories/QuestionSearchRepository";

export interface ExplorerState {
  filters: QuestionSearchFilters;
  selectionBasket: Set<string>; // Storing selected question IDs
  previewId: string | null;

  // Actions
  setFilters: (filters: Partial<QuestionSearchFilters>) => void;
  clearFilters: () => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  setPreviewId: (id: string | null) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  filters: {
    query: "",
    limit: 50,
  },
  selectionBasket: new Set(),
  previewId: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, cursor: undefined }, // Reset cursor on filter change
    })),

  clearFilters: () =>
    set(() => ({
      filters: { query: "", limit: 50 },
    })),

  toggleSelection: (id) =>
    set((state) => {
      const newBasket = new Set(state.selectionBasket);
      if (newBasket.has(id)) {
        newBasket.delete(id);
      } else {
        newBasket.add(id);
      }
      return { selectionBasket: newBasket };
    }),

  clearSelection: () => set({ selectionBasket: new Set() }),

  setPreviewId: (id) => set({ previewId: id }),
}));
