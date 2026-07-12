import React, { useReducer } from "react";
import { QuizSessionContext } from "../session/QuizSessionContext";
import { QuizSessionState } from "../session/QuizSessionState";
import { QuizSessionAction } from "../session/QuizSessionTypes";

const initialState: QuizSessionState = {
  lifecycle: "CREATED",
  view: "QUESTION",
  layout: "STANDARD",
  mode: "LEARNER",
  activeQuestionId: null,
  activeQuestionIndex: 0,
  progress: {
    activeQuestionId: null,
    activeQuestionIndex: 0,
    totalQuestions: 0,
    answeredCount: 0,
    bookmarkedCount: 0,
    flaggedCount: 0,
    completedPercentage: 0,
  },
  previewMode: false,
  compactMode: false,
  fullscreenMode: false,
};

function sessionReducer(state: QuizSessionState, action: QuizSessionAction): QuizSessionState {
  switch (action.type) {
    case "SET_LIFECYCLE":
      return { ...state, lifecycle: action.payload };
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    default:
      return state;
  }
}

export const QuizSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  return (
    <QuizSessionContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizSessionContext.Provider>
  );
};
