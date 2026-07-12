"use client";

import React, { useReducer, ReactNode } from "react";
import { QuizTimerContext, QuizTimerContextValue } from "../timer/QuizTimerContext";
import {
  QuizTimerVariant,
  QuizTimerLayout,
  QuizTimerDensity,
  QuizTimerSize,
  QuizTimerDisplay,
  QuizTimerFormat,
  QuizTimerWarningLevel,
  SessionHealth,
  QuizTimerState,
  QuizTimePresentation,
  SessionStatusPresentation,
} from "../timer";

export interface QuizTimerProviderProps {
  children: ReactNode;
  initialTime?: QuizTimePresentation;
  initialSession?: SessionStatusPresentation;
  initialConfig?: Partial<QuizTimerContextValue["config"]>;
}

type QuizTimerAction =
  | { type: "UPDATE_TIME"; payload: Partial<QuizTimePresentation> }
  | { type: "UPDATE_SESSION"; payload: Partial<SessionStatusPresentation> }
  | { type: "UPDATE_CONFIG"; payload: Partial<QuizTimerContextValue["config"]> };

function timerReducer(
  state: QuizTimerContextValue,
  action: QuizTimerAction
): QuizTimerContextValue {
  switch (action.type) {
    case "UPDATE_TIME":
      return {
        ...state,
        time: { ...state.time, ...action.payload },
      };
    case "UPDATE_SESSION":
      return {
        ...state,
        session: { ...state.session, ...action.payload },
      };
    case "UPDATE_CONFIG":
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    default:
      return state;
  }
}

const DEFAULT_TIME: QuizTimePresentation = {
  displayTime: "00:00",
  remainingTimeMs: 0,
  elapsedTimeMs: 0,
  totalTimeMs: 0,
  percentageComplete: 0,
  warningLevel: QuizTimerWarningLevel.NORMAL,
  state: QuizTimerState.INITIALIZING,
};

const DEFAULT_SESSION: SessionStatusPresentation = {
  health: SessionHealth.UNKNOWN,
  phase: "Initializing",
  isLocked: false,
};

const DEFAULT_CONFIG: QuizTimerContextValue["config"] = {
  variant: QuizTimerVariant.DIGITAL,
  layout: QuizTimerLayout.EMBEDDED,
  density: QuizTimerDensity.COMFORTABLE,
  size: QuizTimerSize.MD,
  displayMode: QuizTimerDisplay.FULL,
  format: QuizTimerFormat.MM_SS,
  capabilities: {
    canPause: false,
    canExtend: false,
    canHide: false,
    canChangeVariant: false,
  },
};

export function QuizTimerProvider({
  children,
  initialTime,
  initialSession,
  initialConfig,
}: QuizTimerProviderProps) {
  const [state, dispatch] = useReducer(timerReducer, {
    time: { ...DEFAULT_TIME, ...initialTime },
    session: { ...DEFAULT_SESSION, ...initialSession },
    config: { ...DEFAULT_CONFIG, ...initialConfig },
  });

  // Provide a stable context value. We also expose a way to dispatch updates for dev/playground
  const contextValue: QuizTimerContextValue & {
    updateTime: (updates: Partial<QuizTimePresentation>) => void;
    updateSession: (updates: Partial<SessionStatusPresentation>) => void;
    updateConfig: (updates: Partial<QuizTimerContextValue["config"]>) => void;
  } = {
    ...state,
    updateTime: (payload) => dispatch({ type: "UPDATE_TIME", payload }),
    updateSession: (payload) => dispatch({ type: "UPDATE_SESSION", payload }),
    updateConfig: (payload) => dispatch({ type: "UPDATE_CONFIG", payload }),
  };

  return <QuizTimerContext.Provider value={contextValue}>{children}</QuizTimerContext.Provider>;
}
