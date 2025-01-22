import { useContext, useMemo } from "react";
import "./Area.css";
import { ChartContext } from "./ChartContext";
import { getSplinePath } from "./getSplinePath";
import { Point } from "./point";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";

export function Area({ className, points, baseY, smoothness }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const input = useChartInput(
    "area",
    useMemo(() => {
      if (points.length < 2) {
        return [];
      }

      const firstPoint = points[0];
      const lastPoint = points[points.length - 1];

      return [
        ...points,
        { x: lastPoint.x, y: baseY },
        { x: firstPoint.x, y: baseY },
      ];
    }, [baseY, points])
  );

  const draw = useDraw();

  const path = useMemo(() => {
    if (!input) {
      return undefined;
    }

    if (input.points.length < 4) {
      return undefined;
    }

    const drawPoints = input.points.map((point) => draw(point));

    const splinePoints = drawPoints.slice(0, -2);
    const splinePath = getSplinePath(splinePoints, smoothness ?? 0.3);

    const baseStartPoint = drawPoints[drawPoints.length - 2];
    const baseEndPoint = drawPoints[drawPoints.length - 1];
    const basePath = `L ${baseStartPoint.x} ${baseStartPoint.y} L ${baseEndPoint.x} ${baseEndPoint.y} Z`;

    return `${splinePath} ${basePath}`;
  }, [input, draw, smoothness]);

  return (
    <svg
      className={`handmadeReactChart-splines-cores-Area ${className ?? ""}`}
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
  baseY: number;
  smoothness?: number;
}
