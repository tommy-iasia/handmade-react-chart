import React, { useMemo } from "react";
import { SplineArea } from "../../splines/SplineArea";
import { SplineChart } from "../../splines/SplineChart";
import { SplineLine } from "../../splines/SplineLine";
import { SimpleXAxis } from "./SimpleXAxis";
import { SimpleYAxis } from "./SimpleYAxis";

export function SimpleSpline({
  chartWidth,
  chartHeight,
  items,
  transitionDuration,
}: Props) {
  const minimum = useMemo(() => {
    const ys = items.flatMap((item) => item.points).map((point) => point.y);
    return Math.min(...ys);
  }, [items]);

  return (
    <SplineChart
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      contentLeft={40}
      contentTop={5}
      contentWidth={chartWidth - 55}
      contentHeight={chartHeight - 35}
      transitionDuration={transitionDuration ?? 200}
    >
      <SimpleXAxis />
      <SimpleYAxis />

      {items.map((item, i) => (
        <SplineLine key={`line-${i}`} points={item.points} />
      ))}

      {items.map((item, i) => (
        <SplineArea
          key={`area-${i}`}
          points={item.points.map((point) => ({
            x: point.x,
            upperY: point.y,
            lowerY: Math.min(minimum, 0),
          }))}
        />
      ))}
    </SplineChart>
  );
}

interface Props {
  chartWidth: number;
  chartHeight: number;
  items: { points: { x: number; y: number }[] }[];
  transitionDuration?: number;
}
