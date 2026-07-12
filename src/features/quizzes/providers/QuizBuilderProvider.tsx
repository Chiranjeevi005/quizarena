import React, { useReducer } from "react";
import { QuizBuilderContext } from "../builder/QuizBuilderContext";
import { QuizBuilderState } from "../builder/QuizBuilderState";
import { QuizBuilderAction } from "../builder/QuizBuilderTypes";

const initialState: QuizBuilderState = {
  mode: "CREATE",
  selectedItems: [],
  activeSection: "INFORMATION",
  previewVisible: false,
  browserVisible: true,
  outlineVisible: true,
  inspectorVisible: true,
  compactMode: false,
};

function builderReducer(state: QuizBuilderState, action: QuizBuilderAction): QuizBuilderState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "TOGGLE_PREVIEW":
      return { ...state, previewVisible: !state.previewVisible };
    default:
      return state;
  }
}

export const QuizBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  return (
    <QuizBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizBuilderContext.Provider>
  );
};
