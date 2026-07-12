import React, { useReducer } from "react";
import { QuizResultsContext } from "../results/QuizResultsContext";
import { QuizResultsState } from "../results/QuizResultsState";
import { QuizResultsAction } from "../results/QuizResultsTypes";

const initialState: QuizResultsState = {
  activeView: "OVERVIEW",
  layout: "STANDARD",
  density: "COMFORTABLE",
  compactMode: false,
  fullscreenMode: false,
  selectedInsight: null,
  selectedGuidance: null,
  selectedBreakdown: null,
  selectedChart: null,
  comparisonVisible: false,
};

function resultsReducer(state: QuizResultsState, action: QuizResultsAction): QuizResultsState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, activeView: action.payload };
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    default:
      return state;
  }
}

export const QuizResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resultsReducer, initialState);
  return (
    <QuizResultsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizResultsContext.Provider>
  );
};
