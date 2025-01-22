import { useContext, useMemo } from "react";
import { ChartContext } from "../cores/ChartContext";
import { findRange } from "../cores/findRange";
import { XAxis } from "../cores/XAxis";
import { getSimpleAxisValues } from "./getSimpleAxisValues";

export function SimpleXAxis({ className, capacity }: Props) {
  const { coordinateInput, pointsInputs } = useContext(ChartContext);

  const range = useMemo(() => {
    const rangeInputs = pointsInputs.filter((input) => input.type !== "axis");

    return findRange(coordinateInput, rangeInputs);
  }, [coordinateInput, pointsInputs]);

  const labels = useMemo(() => {
    const xs = getSimpleAxisValues(range.minimum.x, range.maximum.x, capacity);

    return xs.map((x) => ({
      x,
      text: `${x}`,
    }));
  }, [capacity, range]);

  return <XAxis className={className} y={range.minimum.y} labels={labels} />;
}

interface Props {
  className?: string;
  capacity: number;
}
