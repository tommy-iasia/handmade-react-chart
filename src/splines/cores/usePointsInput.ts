import { useContext, useEffect } from "react";
import { useJsonMemo } from "../../utilities/useJsonMemo";
import { ChartContext } from "./ChartContext";
import { Point } from "./point";
import { PointsInput } from "./pointsInput";

export function usePointsInput(
  type: PointsInput["type"],
  inputPoints: Point[]
) {
  const { setPointsInputs } = useContext(ChartContext);

  const inputInput = (() => {
    if (inputPoints.length <= 0) {
      return undefined;
    }

    const purePoints = inputPoints.map((inputPoint) => ({
      x: inputPoint.x,
      y: inputPoint.y,
    }));

    const xs = purePoints.map((point) => point.x);
    const ys = purePoints.map((point) => point.y);

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
      points: purePoints,
      maximum,
      minimum,
    };
  })();

  const memoInput = useJsonMemo(inputInput);

  useEffect(() => {
    if (memoInput) {
      setPointsInputs((oldInputs) => [...oldInputs, memoInput]);

      return () =>
        setPointsInputs((inputs) => inputs.filter((t) => t !== memoInput));
    }
  }, [memoInput, setPointsInputs]);

  return memoInput;
}
