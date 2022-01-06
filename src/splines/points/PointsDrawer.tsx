import React, { useContext } from "react";
import { usePositioning } from "../axes/usePositioning";
import { SplineChartContext } from "../SplineChartContext";
import { AnimatedPoint } from "./AnimatedPoint";

export function PointsDrawer({ transitionDuration }: Props) {
  const { lineItems } = useContext(SplineChartContext);

  const positioning = usePositioning();

  return (
    <>
      {lineItems.flatMap((item, i) =>
        item.points.map((point, j) => {
          const { x, y } = positioning(point.x, point.y);

          return (
            <AnimatedPoint
              key={`${i}-${j}`}
              x={x}
              y={y}
              transitionDuration={transitionDuration ?? 200}
            />
          );
        })
      )}
    </>
  );
}

interface Props {
  transitionDuration?: number;
}
