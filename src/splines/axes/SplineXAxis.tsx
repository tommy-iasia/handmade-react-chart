import { useContext, useEffect, useMemo, useState } from "react";
import { SplineAxisItem } from "../SplineAxisItem";
import { SplineChartContext } from "../SplineChartContext";
import { DrawXAxis } from "./DrawXAxis";
import { Label } from "./SplineYAxis";
import { usePositioning } from "./usePositioning";

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
    areaItems,
    setXAxes,
  } = useContext(SplineChartContext);

  const [axis, setAxis] = useState<SplineAxisItem>();

  useEffect(() => {
    if (lineItems.length <= 0) {
      setAxis(undefined);
      return;
    }

    const lineValues = lineItems
      .flatMap((item) => item.points)
      .map((point) => point.x);

    const areaValues = areaItems
      .flatMap((item) => item.points)
      .map((point) => point.x);

    const labelValues = inputLabels.map((label) => label.value);

    const allValues = [...lineValues, ...areaValues, ...labelValues];

    const maximum =
      inputMaximum ?? allValues.length > 0
        ? allValues.reduce((s, t) => Math.max(s, t))
        : undefined;

    const minimum =
      inputMinimum ?? allValues.length > 0
        ? allValues.reduce((s, t) => Math.min(s, t))
        : undefined;

    setAxis({
      from: minimum ?? 0,
      range: (maximum ?? 0) - (minimum ?? 0),
    });
  }, [areaItems, inputLabels, inputMaximum, inputMinimum, lineItems]);

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
