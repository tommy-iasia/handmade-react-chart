import { useCallback, useContext } from "react";
import { ChartContext } from "./ChartContext";
import { Point } from "./point";
import { useRange } from "./useRange";

export function useDraw() {
  const { contentLeft, contentTop, contentWidth, contentHeight } =
    useContext(ChartContext);

  const range = useRange();

  const drawX = useCallback(
    (x: number) =>
      (range && range.maximum.x - range.minimum.x > 0
        ? (x - range.minimum.x) / (range.maximum.x - range.minimum.x)
        : 0.5) *
        contentWidth +
      contentLeft,
    [contentLeft, contentWidth, range]
  );

  const drawY = useCallback(
    (y: number) =>
      (1 -
        (range && range.maximum.y - range.minimum.y > 0
          ? (y - range.minimum.y) / (range.maximum.y - range.minimum.y)
          : 0.5)) *
        contentHeight +
      contentTop,
    [contentHeight, contentTop, range]
  );

  return useCallback(
    (point: Point) => ({
      x: drawX(point.x),
      y: drawY(point.y),
    }),
    [drawX, drawY]
  );
}
