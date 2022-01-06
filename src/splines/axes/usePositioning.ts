import { useCallback, useContext, useMemo } from "react";
import { SplineChartContext } from "../SplineChartContext";

export function usePositioning() {
  const {
    contentLeft,
    contentTop,
    contentWidth,
    contentHeight,
    lineItems,
    areaItems,
    xAxes,
    yAxes,
  } = useContext(SplineChartContext);

  const xAxis = useMemo(() => {
    if (xAxes.length > 0) {
      return xAxes[0];
    } else {
      const lineXs = lineItems
        .flatMap((item) => item.points)
        .map((point) => point.x);

      const areaXs = areaItems
        .flatMap((item) => item.points)
        .map((point) => point.x);

      const allXs = [...lineXs, ...areaXs];

      if (allXs.length <= 0) {
        return {
          from: 0,
          range: 0,
        };
      }

      const maximum = Math.max(...allXs);
      const minimum = Math.min(...allXs);

      return {
        from: minimum,
        range: maximum - minimum,
      };
    }
  }, [areaItems, lineItems, xAxes]);

  const yAxis = useMemo(() => {
    if (yAxes.length > 0) {
      return yAxes[0];
    } else {
      const lineYs = lineItems
        .flatMap((item) => item.points)
        .map((point) => point.y);

      const areaYs = areaItems
        .flatMap((item) => item.points)
        .flatMap((point) => [point.upperY, point.lowerY]);

      const allYs = [...lineYs, ...areaYs];

      if (allYs.length <= 0) {
        return {
          from: 0,
          range: 0,
        };
      }

      const maximum = Math.max(...allYs);
      const minimum = Math.min(...allYs);

      return {
        from: minimum,
        range: maximum - minimum,
      };
    }
  }, [areaItems, lineItems, yAxes]);

  return useCallback(
    (x: number, y: number) => {
      const xRatio = xAxis.range > 0 ? (x - xAxis.from) / xAxis.range : 0;
      const yRatio = yAxis.range > 0 ? (y - yAxis.from) / yAxis.range : 0;

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
