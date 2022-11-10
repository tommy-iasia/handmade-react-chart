import { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";
import { Point } from "./point";
import { PointsInput } from "./pointsInput";
import { useStableInput } from "./useStableInput";

export function useChartInput(type: PointsInput["type"], points: Point[]) {
  const { setPointsInputs } = useContext(ChartContext);

  const input = useStableInput(type, points);

  useEffect(() => {
    if (input) {
      setPointsInputs((oldInputs) => [...oldInputs, input]);

      return () =>
        setPointsInputs((inputs) => inputs.filter((t) => t !== input));
    }
  }, [input, setPointsInputs]);

  return input;
}
