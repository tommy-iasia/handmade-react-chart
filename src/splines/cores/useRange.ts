import { useContext, useMemo } from "react";
import { ChartContext } from "./ChartContext";
import { findRange } from "./findRange";

export function useRange() {
  const { coordinateInput, pointsInputs } = useContext(ChartContext);

  return useMemo(
    () => findRange(coordinateInput, pointsInputs),
    [coordinateInput, pointsInputs]
  );
}
