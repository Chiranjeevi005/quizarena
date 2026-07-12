"use client";
import React, { useReducer } from "react";
import {
  QuizDeliveryContext,
  QuizDeliveryContextValue,
  QuizDeliveryState,
  QuizDeliveryLayout,
  QuizDeliveryVariant,
  QuizDeliveryStage,
  QuizDeliveryMode,
  DeliveryPresentation,
  DeliveryWorkspacePresentation,
  DeliveryStagePresentation,
  QuizDeliveryAction,
} from "../delivery";

interface QuizDeliveryProviderProps {
  children: React.ReactNode;
  initialConfig?: {
    layout?: QuizDeliveryLayout;
    variant?: QuizDeliveryVariant;
    mode?: QuizDeliveryMode;
    compactMode?: boolean;
    fullscreenMode?: boolean;
    sidebarVisible?: boolean;
    navigationVisible?: boolean;
    timerVisible?: boolean;
    inspectorVisible?: boolean;
    toolbarVisible?: boolean;
  };
  initialState?: {
    state?: QuizDeliveryState;
    deliveryStage?: QuizDeliveryStage;
    activeWorkspace?: string | null;
    presentation?: DeliveryPresentation | null;
    workspacePresentation?: DeliveryWorkspacePresentation | null;
    stagePresentation?: DeliveryStagePresentation | null;
  };
}

function quizDeliveryReducer(
  state: QuizDeliveryContextValue,
  action: QuizDeliveryAction
): QuizDeliveryContextValue {
  switch (action.type) {
    case "SET_STAGE":
      return { ...state, deliveryStage: action.payload };
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "SET_STAGE_PRESENTATION":
      return { ...state, stagePresentation: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarVisible: !state.sidebarVisible };
    case "TOGGLE_FULLSCREEN":
      return { ...state, fullscreenMode: !state.fullscreenMode };
    case "TOGGLE_TIMER":
      return { ...state, timerVisible: !state.timerVisible };
    case "TOGGLE_COMPACT_MODE":
      return { ...state, compactMode: !state.compactMode };
    default:
      return state;
  }
}

export function QuizDeliveryProvider({
  children,
  initialConfig,
  initialState,
}: QuizDeliveryProviderProps) {
  const [state, dispatch] = useReducer(quizDeliveryReducer, {
    state: initialState?.state ?? QuizDeliveryState.READY,
    deliveryStage: initialState?.deliveryStage ?? QuizDeliveryStage.READY,
    layout: initialConfig?.layout ?? QuizDeliveryLayout.STANDARD,
    variant: initialConfig?.variant ?? QuizDeliveryVariant.DEFAULT,
    mode: initialConfig?.mode ?? QuizDeliveryMode.STANDARD,
    compactMode: initialConfig?.compactMode ?? false,
    fullscreenMode: initialConfig?.fullscreenMode ?? false,
    sidebarVisible: initialConfig?.sidebarVisible ?? true,
    navigationVisible: initialConfig?.navigationVisible ?? true,
    timerVisible: initialConfig?.timerVisible ?? true,
    inspectorVisible: initialConfig?.inspectorVisible ?? false,
    toolbarVisible: initialConfig?.toolbarVisible ?? true,
    activeWorkspace: initialState?.activeWorkspace ?? null,
    presentation: initialState?.presentation ?? null,
    workspacePresentation: initialState?.workspacePresentation ?? null,
    stagePresentation: initialState?.stagePresentation ?? null,
    dispatch: () => {},
  });

  const contextValue: QuizDeliveryContextValue = {
    ...state,
    dispatch,
  };

  return (
    <QuizDeliveryContext.Provider value={contextValue}>{children}</QuizDeliveryContext.Provider>
  );
}
