import { useContext, useMemo } from "react";
import "./Area.css";
import { ChartContext } from "./ChartContext";
import { getSplinePath } from "./getSplinePath";
import { Point } from "./point";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";

export function Area({
  className,
  points: splinePoints,
  baseY,
  smoothness,
}: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const areaPoints = useMemo(() => {
    if (splinePoints.length < 2) {
      return [];
    }

    const firstPoint = splinePoints[0];
    const lastPoint = splinePoints[splinePoints.length - 1];

    return [
      ...splinePoints,
      { x: lastPoint.x, y: baseY },
      { x: firstPoint.x, y: baseY },
    ];
  }, [baseY, splinePoints]);

  const chartInput = useChartInput("area", areaPoints);

  const draw = useDraw();

  const path = useMemo(() => {
    if (!chartInput) {
      return undefined;
    }

    if (!draw) {
      return undefined;
    }

    const { points: inputPoints } = chartInput;

    if (inputPoints.length < 4) {
      return undefined;
    }

    const drawPoints = inputPoints.map((point) => draw(point));

    const splinePoints = drawPoints.slice(0, -2);
    const splinePath = getSplinePath(splinePoints, smoothness ?? 0.3);

    const baseStartPoint = drawPoints[drawPoints.length - 2];
    const baseEndPoint = drawPoints[drawPoints.length - 1];
    const basePath = `L ${baseStartPoint.x} ${baseStartPoint.y} L ${baseEndPoint.x} ${baseEndPoint.y} Z`;

    return `${splinePath} ${basePath}`;
  }, [chartInput, draw, smoothness]);

  if (!path) {
    return <></>;
  }

  return (
    <svg
      className={`handmadeReactChart-splines-cores-Area ${className ?? ""}`}
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
  baseY: number;
  smoothness?: number;
}
