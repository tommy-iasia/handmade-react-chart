import { useCallback } from "react";
import { Transition, useTransition } from "./useTransition";

export function useTransitionValue(value: number, transitionDuration: number) {
  const getOutputValue = useCallback(
    (transition: Transition<number>, time: number) => {
      const progress = getProgress(
        transition.fromTime,
        time,
        transition.transitionDuration
      );

      if (progress >= 1) {
        return transition.toValue;
      }

      return (
        (transition.toValue - transition.fromValue) * progress +
        transition.fromValue
      );
    },
    []
  );

  return useTransition(value, getOutputValue, transitionDuration);
}

export function getProgress(
  fromTime: number,
  toTime: number,
  transitionDuration: number
) {
  const elapsed = toTime - fromTime;

  const ratio =
    transitionDuration > 0
      ? Math.min(Math.max(elapsed / transitionDuration, 0), 1)
      : 1;

  return Math.pow(ratio, 3);
}
