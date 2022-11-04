import { useContext, useMemo } from "react";
import "./Area.css";
import { ChartContext } from "./ChartContext";
import { getSplinePath } from "./getSplinePath";
import { useDraw } from "./useDraw";
import { usePointsInput } from "./usePointsInput";

export function Area({ points: propsPoints, baseY, smoothness }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const pointsInput = usePointsInput("area", propsPoints);

  const draw = useDraw();

  const path = useMemo(() => {
    if (!pointsInput) {
      return undefined;
    }

    if (!draw) {
      return undefined;
    }

    const { points: inputPoints } = pointsInput;
    const drawPoints = inputPoints.map((point) => draw(point));

    if (drawPoints.length < 2) {
      return undefined;
    }

    const splinePath = getSplinePath(drawPoints, smoothness ?? 0.3);

    const firstInputPoint = inputPoints[0];
    const firstDrawPoint = draw({ x: firstInputPoint.x, y: baseY });

    const lastInputPoint = inputPoints[inputPoints.length - 1];
    const lastDrawPoint = draw({ x: lastInputPoint.x, y: baseY });

    const completePath = `L ${lastDrawPoint.x} ${lastDrawPoint.y} L ${firstDrawPoint.x} ${firstDrawPoint.y} Z`;

    return `${splinePath} ${completePath}`;
  }, [baseY, draw, pointsInput, smoothness]);

  if (!path) {
    return <></>;
  }

  return (
    <svg
      className="handmadeReactChart-splines-cores-Area"
      width={chartWidth}
      height={chartHeight}
    >
      <path d={path} />
    </svg>
  );
}

interface Props {
  points: { x: number; y: number }[];
  baseY: number;
  smoothness?: number;
}
