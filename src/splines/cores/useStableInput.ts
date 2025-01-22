import { useMemo } from "react";
import { useStable } from "../../utilities/useStable";
import { Point } from "./point";
import { PointsInput } from "./pointsInput";

export function useStableInput(type: PointsInput["type"], points: Point[]) {
  const stablePoints = useStable(
    points,
    (oldPoint, newPoint) =>
      oldPoint.x === newPoint.x && oldPoint.y === newPoint.y
  );

  return useMemo(() => {
    if (stablePoints.length <= 0) {
      return undefined;
    }

    const xs = stablePoints.map((point) => point.x);
    const ys = stablePoints.map((point) => point.y);

    const maximum = {
      x: Math.max(...xs),
      y: Math.max(...ys),
    };
    const minimum = {
      x: Math.min(...xs),
      y: Math.min(...ys),
    };

    return {
      type,
      points: stablePoints,
      maximum,
      minimum,
    };
  }, [stablePoints, type]);
}
