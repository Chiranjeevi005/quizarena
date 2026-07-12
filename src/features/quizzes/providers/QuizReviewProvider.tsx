"use client";
import React, { useReducer } from "react";
import {
  QuizReviewContext,
  QuizReviewContextValue,
  QuizReviewState,
  QuizReviewLayout,
  QuizReviewDensity,
  QuizReviewMode,
  QuizReviewDisplay,
  ReviewFilter,
  SubmissionReadinessPresentation,
  ReviewStatisticsPresentation,
  QuizReviewAction,
} from "../review";

interface QuizReviewProviderProps {
  children: React.ReactNode;
  initialConfig?: {
    layout?: QuizReviewLayout;
    density?: QuizReviewDensity;
    mode?: QuizReviewMode;
    display?: QuizReviewDisplay;
    compactMode?: boolean;
    fullscreenMode?: boolean;
  };
  initialState?: {
    state?: QuizReviewState;
    filter?: ReviewFilter;
    selectedQuestionId?: string | null;
    activeSection?: string | null;
    readiness?: SubmissionReadinessPresentation | null;
    statistics?: ReviewStatisticsPresentation | null;
  };
}

function quizReviewReducer(
  state: QuizReviewContextValue,
  action: QuizReviewAction
): QuizReviewContextValue {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SELECT_QUESTION":
      return { ...state, selectedQuestionId: action.payload };
    case "TOGGLE_INSPECTOR":
      return { ...state, inspectorVisible: !state.inspectorVisible };
    case "INITIATE_SUBMISSION":
      return { ...state, state: QuizReviewState.CONFIRMING, submissionVisible: true };
    case "CANCEL_SUBMISSION":
      return { ...state, state: QuizReviewState.REVIEWING, submissionVisible: false };
    default:
      return state;
  }
}

export function QuizReviewProvider({
  children,
  initialConfig,
  initialState,
}: QuizReviewProviderProps) {
  const [state, dispatch] = useReducer(quizReviewReducer, {
    state: initialState?.state ?? QuizReviewState.READY,
    layout: initialConfig?.layout ?? QuizReviewLayout.FULL,
    density: initialConfig?.density ?? QuizReviewDensity.COMFORTABLE,
    mode: initialConfig?.mode ?? QuizReviewMode.VIEW,
    filter: initialState?.filter ?? ReviewFilter.ALL,
    selectedQuestionId: initialState?.selectedQuestionId ?? null,
    activeSection: initialState?.activeSection ?? null,
    inspectorVisible: false,
    summaryVisible: true,
    navigationVisible: true,
    submissionVisible: false,
    compactMode: initialConfig?.compactMode ?? false,
    fullscreenMode: initialConfig?.fullscreenMode ?? false,
    readiness: initialState?.readiness ?? null,
    statistics: initialState?.statistics ?? null,
    dispatch: () => {},
  });

  const contextValue: QuizReviewContextValue = {
    ...state,
    dispatch,
  };

  return <QuizReviewContext.Provider value={contextValue}>{children}</QuizReviewContext.Provider>;
}
