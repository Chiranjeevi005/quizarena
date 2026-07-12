"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";
import { QuizDeliveryStage } from "../../../delivery";
import { DeliveryTransitionPlaceholder } from "../";
import {
  ReadyStage,
  InstructionsStage,
  ActiveStage,
  PausedStage,
  ReviewStage,
  SubmittingStage,
  ResultsStage,
} from "../stages";

export function StageComposer() {
  const { deliveryStage } = useQuizDelivery();

  const renderStage = () => {
    switch (deliveryStage) {
      case QuizDeliveryStage.READY:
        return <ReadyStage />;
      case QuizDeliveryStage.INSTRUCTIONS:
        return <InstructionsStage />;
      case QuizDeliveryStage.ACTIVE:
        return <ActiveStage />;
      case QuizDeliveryStage.PAUSED:
        return <PausedStage />;
      case QuizDeliveryStage.REVIEW:
        return <ReviewStage />;
      case QuizDeliveryStage.SUBMITTING:
        return <SubmittingStage />;
      case QuizDeliveryStage.RESULTS:
        return <ResultsStage />;
      default:
        return null;
    }
  };

  return (
    <DeliveryTransitionPlaceholder className="w-full h-full">
      {renderStage()}
    </DeliveryTransitionPlaceholder>
  );
}
