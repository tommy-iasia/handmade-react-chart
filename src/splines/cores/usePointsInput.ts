import { useContext, useEffect, useMemo } from "react";
import { ChartContext } from "./ChartContext";
import { Point } from "./point";
import { PointsInput } from "./pointsInput";

export function usePointsInput(type: PointsInput["type"], points: Point[]) {
  const { setPointsInputs } = useContext(ChartContext);

  const input = useMemo(() => {
    if (points.length <= 0) {
      return undefined;
    }

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

    return {
      type,
      points,
      maximum,
      minimum,
    };
  }, [points, type]);

  useEffect(() => {
    if (input) {
      setPointsInputs((oldInputs) => [...oldInputs, input]);

      return () =>
        setPointsInputs((inputs) => inputs.filter((t) => t !== input));
    }
  }, [input, setPointsInputs]);
}
