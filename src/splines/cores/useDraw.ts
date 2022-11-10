import { useContext } from "react";
import { ChartContext } from "./ChartContext";
import { Point } from "./point";
import { useRange } from "./useRange";

export function useDraw() {
  const { contentLeft, contentTop, contentWidth, contentHeight } =
    useContext(ChartContext);

  const range = useRange();

  if (!range) {
    return undefined;
  }

  const { maximum, minimum } = range;

  const drawX =
    maximum.x - minimum.x > 0
      ? (x: number) =>
          ((x - minimum.x) / (maximum.x - minimum.x)) * contentWidth +
          contentLeft
      : () => contentWidth / 2 + contentLeft;

  const drawY =
    maximum.y - minimum.y > 0
      ? (y: number) =>
          (1 - (y - minimum.y) / (maximum.y - minimum.y)) * contentHeight +
          contentTop
      : () => contentHeight / 2 + contentTop;

  return (point: Point) => ({
    x: drawX(point.x),
    y: drawY(point.y),
  });
}
