import { ReactNode } from "react";
import { Point } from "../cores/point";
import { PointLabels } from "./PointLabels";
import { SimpleChart } from "./SimpleChart";

export function AdvancedChart({
  className,
  width,
  height,
  items,
  smoothness,
  getLabel,
  children,
}: Props) {
  return (
    <SimpleChart
      className={className}
      width={width}
      height={height}
      items={items}
      smoothness={smoothness}
    >
      <PointLabels items={items} getLabel={getLabel} />

      {children}
    </SimpleChart>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  items: { points: Point[] }[];
  smoothness?: number;
  getLabel: (point: Point) => string;
  children?: ReactNode;
}
