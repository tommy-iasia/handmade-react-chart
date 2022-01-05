import { useCallback, useContext, useMemo } from "react";
import { SplineChartContext } from "../SplineChartContext";

export function usePositioning() {
  const {
    contentLeft,
    contentTop,
    contentWidth,
    contentHeight,
    lineItems,
    xAxes,
    yAxes,
  } = useContext(SplineChartContext);

  const xAxis = useMemo(() => {
    if (xAxes.length > 0) {
      return xAxes[0];
    } else {
      const xs = lineItems
        .flatMap((lineItem) => lineItem.points)
        .map((point) => point.x);

      const maximum = xs.reduce((s, t) => Math.max(s, t), 0);
      const minimum = xs.reduce((s, t) => Math.min(s, t), 0);

      return {
        from: minimum,
        range: maximum - minimum,
      };
    }
  }, [lineItems, xAxes]);

  const yAxis = useMemo(() => {
    if (yAxes.length > 0) {
      return yAxes[0];
    } else {
      const ys = lineItems
        .flatMap((lineItem) => lineItem.points)
        .map((point) => point.y);

      const maximum = ys.reduce((s, t) => Math.max(s, t), 0);
      const minimum = ys.reduce((s, t) => Math.min(s, t), 0);

      return {
        from: minimum,
        range: maximum - minimum,
      };
    }
  }, [lineItems, yAxes]);

  return useCallback(
    (x: number, y: number) => {
      const xRatio = (x - xAxis.from) / (xAxis.range || 1);
      const yRatio = (y - yAxis.from) / (yAxis.range || 1);

      return {
        x: contentLeft + xRatio * contentWidth,
        y: contentTop + (1 - yRatio) * contentHeight,
      };
    },
    [
      contentHeight,
      contentLeft,
      contentTop,
      contentWidth,
      xAxis.from,
      xAxis.range,
      yAxis.from,
      yAxis.range,
    ]
  );
}
