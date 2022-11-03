import { useContext, useMemo } from "react";
import { ChartContext } from "./ChartContext";
import { getSplinePath } from "./getSplinePath";
import "./Spline.css";
import { useDraw } from "./useDraw";
import { usePointsInput } from "./usePointsInput";

export function Spline({ points: propsPoints, smoothness }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const pointsInput = usePointsInput("spline", propsPoints);

  const draw = useDraw();

  const path = useMemo(() => {
    if (!pointsInput) {
      return undefined;
    }

    if (!draw) {
      return undefined;
    }

    const drawPoints = pointsInput.points.map((point) => draw(point));

    if (drawPoints.length < 2) {
      return undefined;
    }

    return getSplinePath(drawPoints, smoothness ?? 0.3);
  }, [draw, pointsInput, smoothness]);

  if (!path) {
    return <></>;
  }

  return (
    <svg
      className="handmadeReactChart-splines-cores-Spline"
      width={chartWidth}
      height={chartHeight}
    >
      <path d={path} />
    </svg>
  );
}

interface Props {
  points: { x: number; y: number }[];
  smoothness?: number;
}
