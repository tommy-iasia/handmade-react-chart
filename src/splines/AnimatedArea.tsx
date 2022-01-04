import { useCallback, useMemo } from "react";
import { Transition, useTransition } from "../charts/useTransition";
import { getProgress } from "../charts/useTransitionValue";
import { DrawArea } from "./DrawArea";

export function AnimatedArea({
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
          upperY:
            (toPoint.upperY - fromPoint.upperY) * progress + fromPoint.upperY,
          lowerY:
            (toPoint.lowerY - fromPoint.lowerY) * progress + fromPoint.lowerY,
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
    <DrawArea points={outputValue.points} smoothness={outputValue.smoothness} />
  );
}

interface Props {
  points: { x: number; upperY: number; lowerY: number }[];
  smoothness?: number;
  transitionDuration: number;
}

interface Value {
  points: { x: number; upperY: number; lowerY: number }[];
  smoothness: number;
}
