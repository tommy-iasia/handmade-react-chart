import { useContext } from "react";
import { ChartContext } from "./ChartContext";
import { useRange } from "./useRange";

export function useDraw() {
  const { contentLeft, contentTop, contentWidth, contentHeight } =
    useContext(ChartContext);

  const range = useRange();

  if (!range) {
    return undefined;
  }

  const drawX =
    range.maximum.x - range.minimum.x > 0
      ? (x: number) =>
          ((x - range.minimum.x) / (range.maximum.x - range.minimum.x)) *
            contentWidth +
          contentLeft
      : () => contentWidth / 2 + contentLeft;

  const drawY =
    range.maximum.y - range.minimum.y > 0
      ? (y: number) =>
          (1 - (y - range.minimum.y) / (range.maximum.y - range.minimum.y)) *
            contentHeight +
          contentTop
      : () => contentHeight / 2 + contentTop;

  return (point: { x: number; y: number }) => ({
    x: drawX(point.x),
    y: drawY(point.y),
  });
}
