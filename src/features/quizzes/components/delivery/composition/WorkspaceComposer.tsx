"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";
import { StageComposer } from "./StageComposer";
import {
  QuizDeliveryWorkspace,
  QuizDeliveryLoading,
  QuizDeliveryEmpty,
  QuizDeliveryError,
} from "../";
import { QuizDeliveryState } from "../../../delivery";

export function WorkspaceComposer({ className = "" }: { className?: string }) {
  const { state } = useQuizDelivery();

  if (state === QuizDeliveryState.INITIALIZING)
    return <QuizDeliveryLoading className={className} />;
  if (state === QuizDeliveryState.ERROR) return <QuizDeliveryError className={className} />;
  if (
    state === QuizDeliveryState.READY ||
    state === QuizDeliveryState.ACTIVE ||
    state === QuizDeliveryState.COMPLETED
  ) {
    return (
      <QuizDeliveryWorkspace className={className}>
        <StageComposer />
      </QuizDeliveryWorkspace>
    );
  }

  return <QuizDeliveryEmpty className={className} />;
}
