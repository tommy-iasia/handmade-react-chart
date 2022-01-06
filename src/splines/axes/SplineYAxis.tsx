import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SplineAxisItem } from "../SplineAxisItem";
import { SplineChartContext } from "../SplineChartContext";
import { DrawYAxis } from "./DrawYAxis";
import { usePositioning } from "./usePositioning";

export function SplineYAxis({ labels: inputLabels, axisX }: Props) {
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
    const lineValues = lineItems
      .flatMap((item) => item.points)
      .map((point) => point.y);

    const areaValues = areaItems
      .flatMap((item) => item.points)
      .flatMap((point) => [point.upperY, point.lowerY]);

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
      axisX={axisX}
    />
  );
}

interface Props {
  labels: Label[];
  axisX?: number;
}

export interface Label {
  value: number;
  text?: ReactNode;
}
