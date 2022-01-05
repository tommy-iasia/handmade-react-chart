import { useContext } from "react";
import { usePositioning } from "../axes/usePositioning";
import { SplineChartContext } from "../SplineChartContext";
import { AnimtedPoint } from "./AnimatedPoint";

export function PointsDrawer({ transitionDuration }: Props) {
  const { lineItems } = useContext(SplineChartContext);

  const positioning = usePositioning();

  return (
    <>
      {lineItems.flatMap((item) =>
        item.points.map((point, i) => {
          const { x, y } = positioning(point.x, point.y);

          return (
            <AnimtedPoint
              key={i}
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
