import { ReactNode } from "react";
import { Area } from "../cores/Area";
import { Chart } from "../cores/Chart";
import { Spline } from "../cores/Spline";
import { Point } from "../cores/point";
import { SimpleGrid } from "./SimpleGrid";
import { SimpleXAxis } from "./SimpleXAxis";
import { SimpleYAxis } from "./SimpleYAxis";

export function SimpleChart({
  className,
  width,
  height,
  items,
  smoothness,
  children,
}: Props) {
  const contentLeft = 40;
  const contentTop = 5;
  const contentRight = 15;
  const contentBottom = 30;

  const xCapacity = (width - contentLeft - contentRight) / 40;
  const yCapacity = (height - contentTop - contentBottom) / 40;

  const ys = items.flatMap((item) => item.points.map((point) => point.y));
  const yMinimum = ys.length > 0 ? Math.min(...ys) : 0;

  return (
    <Chart
      className={className}
      chartWidth={width}
      chartHeight={height}
      contentLeft={contentLeft}
      contentTop={contentTop}
      contentRight={contentRight}
      contentBottom={contentBottom}
    >
      <SimpleGrid xCapacity={xCapacity} yCapacity={yCapacity} />

      <SimpleXAxis capacity={xCapacity} />
      <SimpleYAxis capacity={yCapacity} />

      {items.map((item, i) => (
        <Area
          key={`area-${i}`}
          points={item.points}
          baseY={yMinimum}
          smoothness={smoothness}
        />
      ))}

      {items.map((item, i) => (
        <Spline
          key={`spline-${i}`}
          points={item.points}
          smoothness={smoothness}
        />
      ))}

      {children}
    </Chart>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  items: { points: Point[] }[];
  smoothness?: number;
  children?: ReactNode;
}
