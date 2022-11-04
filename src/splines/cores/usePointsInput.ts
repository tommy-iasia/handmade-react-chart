import { useContext, useEffect } from "react";
import { useJsonMemo } from "../../utilities/useJsonMemo";
import { ChartContext } from "./ChartContext";
import { PointsInput } from "./pointsInput";

export function usePointsInput(
  type: PointsInput["type"],
  inputPoints: { x: number; y: number }[]
) {
  const { setPointsInputs } = useContext(ChartContext);

  const inputInput = (() => {
    if (inputPoints.length <= 0) {
      return undefined;
    }

    const sourcePoints = inputPoints.map((inputPoint) => ({
      x: inputPoint.x,
      y: inputPoint.y,
      source: inputPoint,
    }));

    const xs = sourcePoints.map((point) => point.x);
    const ys = sourcePoints.map((point) => point.y);

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
      points: sourcePoints,
      maximum,
      minimum,
    };
  })();

  const memoInput = useJsonMemo(inputInput, (key, value) =>
    key === "source" ? undefined : value
  );

  useEffect(() => {
    if (memoInput) {
      setPointsInputs((oldInputs) => [...oldInputs, memoInput]);

      return () =>
        setPointsInputs((inputs) => inputs.filter((t) => t !== memoInput));
    }
  }, [memoInput, setPointsInputs]);

  return memoInput;
}
