import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { SplineAxisItem } from "../SplineAxisItem";
import { SplineChartContext } from "../SplineChartContext";
import { DrawYAxis } from "./DrawYAxis";
import { usePositioning } from "./usePositioning";

export function SplineYAxis({
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
    setYAxes,
  } = useContext(SplineChartContext);

  const [axis, setAxis] = useState<SplineAxisItem>();

  useEffect(() => {
    if (lineItems.length <= 0) {
      setAxis(undefined);
      return;
    }

    const lineValues = lineItems
      .flatMap((item) => item.points)
      .map((point) => point.y);

    const areaValues = areaItems
      .flatMap((item) => item.points)
      .flatMap((point) => [point.upperY, point.lowerY]);

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

    setYAxes((axes) => [...axes, axis]);

    return () => {
      setYAxes((axes) => axes.filter((t) => t !== axis));
    };
  }, [axis, setYAxes]);

  const positioning = usePositioning();

  const outputLabels = useMemo(
    () =>
      inputLabels.map((inputLabel) => {
        const { y } = positioning(0, inputLabel.value);

        return { y, text: inputLabel.text };
      }),
    [inputLabels, positioning]
  );

  return (
    <DrawYAxis
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

export interface Label {
  value: number;
  text?: ReactNode;
}
