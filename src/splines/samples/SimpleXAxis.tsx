import { useContext, useMemo } from "react";
import { ChartContext } from "../cores/ChartContext";
import { findRange } from "../cores/findRange";
import { XAxis } from "../cores/XAxis";
import { getSimpleAxisValues } from "./getSimpleAxisValues";

export function SimpleXAxis({ capacity }: Props) {
  const { coordinateInput, pointsInputs } = useContext(ChartContext);

  const range = useMemo(() => {
    const rangeInputs = pointsInputs.filter((input) => input.type !== "axis");

    return findRange(coordinateInput, rangeInputs);
  }, [coordinateInput, pointsInputs]);

  const labels = useMemo(() => {
    if (!range) {
      return [];
    }

    const xs = getSimpleAxisValues(range.minimum.x, range.maximum.x, capacity);

    return xs.map((x) => ({
      x,
      text: `${x}`,
    }));
  }, [capacity, range]);

  if (!range) {
    return <></>;
  }

  return <XAxis y={range.minimum.y} labels={labels} />;
}

interface Props {
  capacity: number;
}
