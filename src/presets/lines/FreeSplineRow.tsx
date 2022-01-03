import { useMemo } from "react";
import Chart from "../../charts/Chart";
import { DrawSpline } from "../../lines/DrawSpline";
import { Row } from "../Row";

const points = [
  { x: 0, y: 200 },
  { x: 50, y: 150 },
  { x: 100, y: 10 },
  { x: 150, y: 150 },
  { x: 200, y: 250 },
  { x: 250, y: 300 },
  { x: 300, y: 100 },
  { x: 350, y: 150 },
  { x: 400, y: 300 },
];

export function FreeSplineRow() {
  const points1 = useMemo(
    () => points.map((t, i) => ({ x: t.x, y: Math.random() * 300 + 50 })),
    []
  );

  return (
    <Row
      chart={
        <Chart width={400} height={400}>
          <DrawSpline points={points1} />
        </Chart>
      }
      code="ABC"
      content="ABC"
    />
  );
}
