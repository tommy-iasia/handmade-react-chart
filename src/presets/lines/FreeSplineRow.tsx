import { useMemo, useReducer } from "react";
import Chart from "../../charts/Chart";
import { DrawSpline } from "../../splines/DrawSpline";
import { DrawSplineArea } from "../../splines/DrawSplineArea";
import { Row } from "../Row";

const points = [
  { x: 0, y: 100 },
  { x: 50, y: 75 },
  { x: 100, y: 10 },
  { x: 150, y: 150 },
  { x: 200, y: 180 },
  { x: 250, y: 180 },
  { x: 300, y: 100 },
  { x: 350, y: 150 },
  { x: 400, y: 130 },
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

  const [points2, update2] = useReducer(
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

  const area2 = useMemo(
    () =>
      points2.map((t) => ({
        x: t.x,
        upperY: t.y,
        lowerY: 400,
      })),
    [points2]
  );

  return (
    <Row
      chart={
        <Chart width={300} height={200}>
          <DrawSpline points={points1} smoothness={1} />
          <DrawSplineArea points={area1} smoothness={1} />

          <DrawSpline points={points2} />
          <DrawSplineArea points={area2} />
        </Chart>
      }
      code="ABC"
      content="ABC"
      onMouseLeave={() => {
        update1();
        update2();
      }}
    />
  );
}
