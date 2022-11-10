import { useContext, useMemo } from "react";
import { ChartContext } from "./ChartContext";
import { getSplinePath } from "./getSplinePath";
import { Point } from "./point";
import "./Spline.css";
import { useDraw } from "./useDraw";
import { usePointsInput } from "./usePointsInput";

export function Spline({ className, points: inputPoints, smoothness }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  usePointsInput("spline", inputPoints);

  const draw = useDraw();

  const path = useMemo(() => {
    if (inputPoints.length < 2) {
      return undefined;
    }

    if (!draw) {
      return undefined;
    }

    const drawPoints = inputPoints.map((point) => draw(point));

    return getSplinePath(drawPoints, smoothness ?? 0.3);
  }, [draw, inputPoints, smoothness]);

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
