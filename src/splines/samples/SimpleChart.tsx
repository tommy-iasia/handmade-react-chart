import { ReactNode } from "react";
import { Area } from "../cores/Area";
import { Chart } from "../cores/Chart";
import { Coordinate } from "../cores/Coordinate";
import { Spline } from "../cores/Spline";
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
      <Coordinate includeOriginY={true} />

      <SimpleGrid xCapacity={xCapacity} yCapacity={yCapacity} />

      <SimpleXAxis capacity={xCapacity} />
      <SimpleYAxis capacity={yCapacity} />

      {items.map((item, i) => (
        <Area
          key={`area-${i}`}
          points={item.points}
          baseY={Math.min(yMinimum, 0)}
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
  items: {
    points: { x: number; y: number }[];
  }[];
  smoothness?: number;
  children?: ReactNode;
}
