import { useCallback, useMemo } from "react";
import { Transition, useTransition } from "../charts/useTransition";
import { getProgress } from "../charts/useTransitionValue";
import { DrawSpline } from "./DrawSpline";

export function AnimatedSpline({
  points,
  smoothness,
  transitionDuration,
}: Props) {
  const getOutputValue = useCallback(
    (transition: Transition<Value>, time: number) => {
      const progress = getProgress(
        transition.fromTime,
        time,
        transition.transitionDuration
      );

      if (progress >= 1) {
        return {
          points: transition.toValue.points,
          smoothness: transition.toValue.smoothness,
        };
      }

      const lastFromPoint =
        transition.fromValue.points[transition.fromValue.points.length - 1];
      const fromPoints = [
        ...transition.fromValue.points,
        ...transition.toValue.points
          .slice(transition.fromValue.points.length)
          .map(() => lastFromPoint),
      ];

      const lastToPoint =
        transition.toValue.points[transition.toValue.points.length - 1];
      const toPoints = [
        ...transition.toValue.points,
        ...transition.fromValue.points
          .slice(transition.toValue.points.length)
          .map(() => lastToPoint),
      ];

      const points = fromPoints.map((fromPoint, i) => {
        const toPoint = toPoints[i];

        return {
          x: (toPoint.x - fromPoint.x) * progress + fromPoint.x,
          y: (toPoint.y - fromPoint.y) * progress + fromPoint.y,
        };
      });

      const smoothness =
        (transition.toValue.smoothness - transition.fromValue.smoothness) *
          progress +
        transition.fromValue.smoothness;

      return { points, smoothness };
    },
    []
  );

  const inputValue = useMemo(
    () => ({ points, smoothness: smoothness ?? 1 }),
    [points, smoothness]
  );

  const outputValue = useTransition(
    inputValue,
    getOutputValue,
    transitionDuration
  );

  return (
    <DrawSpline
      points={outputValue.points}
      smoothness={outputValue.smoothness}
    />
  );
}

interface Props {
  points: { x: number; y: number }[];
  smoothness?: number;
  transitionDuration: number;
}

interface Value {
  points: { x: number; y: number }[];
  smoothness: number;
}
