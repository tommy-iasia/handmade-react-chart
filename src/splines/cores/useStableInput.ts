import { useRef } from "react";
import { Point } from "./point";
import { PointsInput } from "./pointsInput";

export function useStableInput(type: PointsInput["type"], points: Point[]) {
  const ref = useRef<PointsInput>();

  if (!match(ref.current, type, points)) {
    if (points.length > 0) {
      const xs = points.map((point) => point.x);
      const ys = points.map((point) => point.y);

      const maximum = {
        x: Math.max(...xs),
        y: Math.max(...ys),
      };
      const minimum = {
        x: Math.min(...xs),
        y: Math.min(...ys),
      };

      ref.current = {
        type,
        points,
        maximum,
        minimum,
      };
    } else {
      ref.current = undefined;
    }
  }

  return ref.current;
}

function match(
  oldInput: PointsInput | undefined,
  newType: PointsInput["type"],
  newPoints: Point[]
) {
  if (!oldInput) {
    return newPoints.length <= 0;
  }

  if (oldInput.type !== newType) {
    return false;
  }

  if (oldInput.points.length !== newPoints.length) {
    return false;
  }

  return oldInput.points.every((oldPoint, i) => {
    const newPoint = newPoints[i];

    return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
  });
}
