import React, { useReducer } from "react";
import { QuestionPlayerContext } from "../player/QuestionPlayerContext";
import { QuestionPlayerState } from "../player/QuestionPlayerState";
import { QuestionPlayerAction } from "../player/QuestionPlayerTypes";

const initialState: QuestionPlayerState = {
  playerMode: "DEFAULT",
  playerLayout: "STANDARD",
  playerView: "QUESTION",
  activeQuestionId: null,
  activeQuestionType: null,
  answerPresentation: {
    selectedOptionIds: [],
    highlightedOptionId: null,
    focusedOptionId: null,
    hoveredOptionId: null,
    disabled: false,
    readonly: false,
  },
  compactMode: false,
  fullscreenMode: false,
  readonlyMode: false,
};

function playerReducer(
  state: QuestionPlayerState,
  action: QuestionPlayerAction
): QuestionPlayerState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, playerMode: action.payload };
    case "TOGGLE_OPTION": {
      const selected = state.answerPresentation.selectedOptionIds.includes(action.payload)
        ? state.answerPresentation.selectedOptionIds.filter((id) => id !== action.payload)
        : [...state.answerPresentation.selectedOptionIds, action.payload];
      return {
        ...state,
        answerPresentation: { ...state.answerPresentation, selectedOptionIds: selected },
      };
    }
    default:
      return state;
  }
}

export const QuestionPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  return (
    <QuestionPlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionPlayerContext.Provider>
  );
};
