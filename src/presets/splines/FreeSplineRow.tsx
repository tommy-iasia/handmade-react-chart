import { useMemo, useReducer } from "react";
import { SplineXAxis } from "../../splines/axes/SplineXAxis";
import { SplineYAxis } from "../../splines/axes/SplineYAxis";
import { SplineChart } from "../../splines/SplineChart";
import { SplineLine } from "../../splines/SplineLine";
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

  const xLabels = useMemo(
    () => [
      { value: 50, text: "50" },
      { value: 100, text: "100" },
      { value: 150, text: "150" },
    ],
    []
  );

  const yLabels = useMemo(
    () => [
      { value: 50, text: "50" },
      { value: 100, text: "100" },
      { value: 150, text: "150" },
    ],
    []
  );

  return (
    <Row
      chart={
        <SplineChart
          chartWidth={300}
          chartHeight={200}
          contentLeft={50}
          contentTop={5}
          contentWidth={245}
          contentHeight={165}
          transitionDuration={200}
        >
          <SplineXAxis labels={xLabels} />
          <SplineYAxis labels={yLabels} />

          <SplineLine points={points1} />
        </SplineChart>
      }
      code="ABC"
      content="ABC"
      onMouseLeave={update1}
    />
  );
}
