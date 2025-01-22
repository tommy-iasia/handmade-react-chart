import { useContext, useMemo } from "react";
import { ChartContext } from "./ChartContext";
import "./Spline.css";
import { getSplinePath } from "./getSplinePath";
import { Point } from "./point";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";

export function Spline({ className, points, smoothness }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const input = useChartInput("spline", points);

  const draw = useDraw();

  const path = useMemo(() => {
    if (!input) {
      return undefined;
    }

    if (input.points.length < 2) {
      return undefined;
    }

    const drawPoints = input.points.map((point) => draw(point));

    return getSplinePath(drawPoints, smoothness ?? 0.3);
  }, [input, draw, smoothness]);

  return (
    <svg
      className={`handmadeReactChart-splines-cores-Spline ${className ?? ""}`}
      width={chartWidth}
      height={chartHeight}
    >
      {path && <path d={path} />}
    </svg>
  );
}

interface Props {
  className?: string;
  points: Point[];
  smoothness?: number;
}
