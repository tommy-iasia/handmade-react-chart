import { useMemo, useReducer } from "react";
import { Chart } from "../../charts/Chart";
import { AnimatedArea } from "../../splines/AnimatedArea";
import { AnimatedSpline } from "../../splines/AnimatedSpline";
import { Row } from "../Row";

const points = [
  { x: 0, y: 100 },
  { x: 50, y: 75 },
  { x: 100, y: 10 },
  { x: 150, y: 150 },
  { x: 200, y: 180 },
];

export function FreeSplineRow() {
  const [points1, update1] = useReducer(
    (points: { x: number; y: number }[]) =>
      points
        .map((t) => ({
          x: t.x,
          y: Math.random() * 150 + 25,
        }))
        .sort((a, b) => a.x - b.x),
    points
  );

  const area1 = useMemo(
    () =>
      points1.map((t) => ({
        x: t.x,
        upperY: t.y,
        lowerY: 400,
      })),
    [points1]
  );

  return (
    <Row
      chart={
        <Chart width={200} height={200}>
          <AnimatedSpline
            width={200}
            height={200}
            points={points1}
            smoothness={1}
            transitionDuration={500}
          />
          <AnimatedArea
            width={200}
            height={200}
            points={area1}
            smoothness={1}
            transitionDuration={500}
          />
        </Chart>
      }
      code="ABC"
      content="ABC"
      onMouseLeave={update1}
    />
  );
}
