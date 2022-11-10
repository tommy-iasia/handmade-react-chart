import { useContext, useMemo } from "react";
import { ChartContext } from "./ChartContext";
import { getSplinePath } from "./getSplinePath";
import { Point } from "./point";
import "./Spline.css";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";

export function Spline({ className, points: inputPoints, smoothness }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const chartInput = useChartInput("spline", inputPoints);

  const draw = useDraw();

  const path = useMemo(() => {
    if (!chartInput) {
      return undefined;
    }

    if (chartInput.points.length < 2) {
      return undefined;
    }

    if (!draw) {
      return undefined;
    }

    const drawPoints = chartInput.points.map((point) => draw(point));

    return getSplinePath(drawPoints, smoothness ?? 0.3);
  }, [chartInput, draw, smoothness]);

  if (!path) {
    return <></>;
  }

  return (
    <svg
      className={`handmadeReactChart-splines-cores-Spline ${className ?? ""}`}
      width={chartWidth}
      height={chartHeight}
    >
      <path d={path} />
    </svg>
  );
}

interface Props {
  className?: string;
  points: Point[];
  smoothness?: number;
}
