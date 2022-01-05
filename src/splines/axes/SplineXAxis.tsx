import { useContext, useEffect, useMemo, useState } from "react";
import { SplineAxisItem } from "../SplineAxisItem";
import { SplineChartContext } from "../SplineChartContext";
import { DrawXAxis } from "./DrawXAxis";
import { Label } from "./SplineYAxis";
import { usePositioning } from "./usePositioning";

export function SplineXAxis({ labels: inputLabels, axisY }: Props) {
  const {
    contentLeft,
    contentTop,
    contentWidth,
    contentHeight,
    lineItems,
    areaItems,
    setXAxes,
  } = useContext(SplineChartContext);

  const [axis, setAxis] = useState<SplineAxisItem>();

  useEffect(() => {
    const lineValues = lineItems
      .flatMap((item) => item.points)
      .map((point) => point.x);

    const areaValues = areaItems
      .flatMap((item) => item.points)
      .map((point) => point.x);

    const labelValues = inputLabels.map((label) => label.value);

    const allValues = [...lineValues, ...areaValues, ...labelValues];

    if (allValues.length <= 0) {
      setAxis(undefined);
      return;
    }

    const maximum = Math.max(...allValues);
    const minimum = Math.min(...allValues);

    setAxis({
      from: minimum,
      range: maximum - minimum,
    });
  }, [areaItems, inputLabels, lineItems]);

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
      axisY={axisY}
    />
  );
}

interface Props {
  labels: Label[];
  maximum?: number;
  minimum?: number;
  axisY?: number;
}
