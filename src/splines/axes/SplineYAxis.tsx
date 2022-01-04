import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { SplineAxisItem } from "../SplineAxisItem";
import { SplineChartContext } from "../SplineChartContext";
import { SplineLineItem } from "../SplineLineItem";
import { usePositioning } from "../usePositioning";
import { DrawYAxis } from "./DrawYAxis";

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
    setYAxes,
  } = useContext(SplineChartContext);

  const [axis, setAxis] = useState<SplineAxisItem>();

  useEffect(() => {
    if (lineItems.length <= 0) {
      setAxis(undefined);
      return;
    }

    const axis = getOutputAxis(
      lineItems,
      (item) => item.y,
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

export function getOutputAxis(
  items: SplineLineItem[],
  getItemValue: (point: { x: number; y: number }) => number,
  labels: Label[],
  maximum: number | undefined,
  minimum: number | undefined
) {
  const outputMaximum = (() => {
    if (maximum !== undefined) {
      return maximum;
    } else {
      const { maximum: lineMaximum } = getLinesRange(items, getItemValue);

      if (labels.length > 0) {
        const { maximum: labelMaximum } = getLabelsRange(labels);
        return Math.max(lineMaximum, labelMaximum);
      } else {
        return lineMaximum;
      }
    }
  })();

  const outputMinimum = (() => {
    if (minimum !== undefined) {
      return minimum;
    } else {
      const { minimum: lineMinimum } = getLinesRange(items, getItemValue);

      if (labels.length > 0) {
        const { minimum: labelMinimum } = getLabelsRange(labels);
        return Math.min(lineMinimum, labelMinimum);
      } else {
        return lineMinimum;
      }
    }
  })();

  return {
    from: outputMinimum,
    range: outputMaximum - outputMinimum,
  };
}

function getLinesRange(
  lineItems: SplineLineItem[],
  getValue: (point: { x: number; y: number }) => number
) {
  const xs = lineItems.flatMap((lineItem) => lineItem.points).map(getValue);

  return {
    maximum: xs.reduce((s, t) => Math.max(s, t), 0),
    minimum: xs.reduce((s, t) => Math.min(s, t), 0),
  };
}

function getLabelsRange(lables: { value: number }[]) {
  const values = lables.map((label) => label.value);

  return {
    maximum: values.reduce((s, t) => Math.max(s, t), 0),
    minimum: values.reduce((s, t) => Math.min(s, t), 0),
  };
}
