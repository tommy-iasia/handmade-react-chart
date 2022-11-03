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

    const maximum = {
      x: Math.max(...sourcePoints.map((point) => point.x)),
      y: Math.max(...sourcePoints.map((point) => point.y)),
    };
    const minimum = {
      x: Math.min(...sourcePoints.map((point) => point.x)),
      y: Math.min(...sourcePoints.map((point) => point.y)),
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
