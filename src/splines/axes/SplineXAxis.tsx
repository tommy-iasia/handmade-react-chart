import { useContext, useEffect, useMemo, useState } from "react";
import { SplineAxisItem } from "../SplineAxisItem";
import { SplineChartContext } from "../SplineChartContext";
import { usePositioning } from "../usePositioning";
import { DrawXAxis } from "./DrawXAxis";
import { getOutputAxis, Label } from "./SplineYAxis";

export function SplineXAxis({
  labels: inputLabels,
  maximum: inputMaximum,
  minimum: inputMinimum,
}: Props) {
  const {
    contentLeft,
    contentTop,
    contentWidth,
    contentHeight,
    lineItems,
    setXAxes,
  } = useContext(SplineChartContext);

  const [axis, setAxis] = useState<SplineAxisItem>();

  useEffect(() => {
    if (lineItems.length <= 0) {
      setAxis(undefined);
      return;
    }

    const axis = getOutputAxis(
      lineItems,
      (item) => item.x,
      inputLabels,
      inputMaximum,
      inputMinimum
    );

    setAxis(axis);
  }, [inputLabels, inputMaximum, inputMinimum, lineItems]);

  useEffect(() => {
    if (!axis) {
      return;
    }

    setXAxes((axes) => [...axes, axis]);

    return () => {
      setXAxes((axes) => axes.filter((t) => t !== axis));
    };
  }, [axis, setXAxes]);

  const positioning = usePositioning();

  const outputLabels = useMemo(
    () =>
      inputLabels.map((inputLabel) => {
        const { x } = positioning(inputLabel.value, 0);

        return { x, text: inputLabel.text };
      }),
    [inputLabels, positioning]
  );

  return (
    <DrawXAxis
      labels={outputLabels}
      contentLeft={contentLeft}
      contentTop={contentTop}
      contentWidth={contentWidth}
      contentHeight={contentHeight}
    />
  );
}

interface Props {
  labels: Label[];
  maximum?: number;
  minimum?: number;
}
