import { useContext, useMemo } from "react";
import { ChartContext } from "../cores/ChartContext";
import { findRange } from "../cores/findRange";
import { YAxis } from "../cores/YAxis";
import { getSimpleAxisValues } from "./getSimpleAxisValues";

export function SimpleYAxis({ className, capacity }: Props) {
  const { coordinateInput, pointsInputs } = useContext(ChartContext);

  const range = useMemo(() => {
    const rangeInputs = pointsInputs.filter((input) => input.type !== "axis");

    return findRange(coordinateInput, rangeInputs);
  }, [coordinateInput, pointsInputs]);

  const labels = useMemo(() => {
    const ys = getSimpleAxisValues(range.minimum.y, range.maximum.y, capacity);

    if (ys[0] === 0 && ys.length > 1) {
      ys.shift();
    }

    return ys.map((y) => ({
      y,
      text: `${y}`,
    }));
  }, [capacity, range]);

  return <YAxis className={className} x={range.minimum.x} labels={labels} />;
}

interface Props {
  className?: string;
  capacity: number;
}
