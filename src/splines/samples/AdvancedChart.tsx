import { ReactNode, useMemo } from "react";
import { SourcePoint } from "../cores/sourcePoint";
import { PointLabels } from "./PointLabels";
import { SimpleChart } from "./SimpleChart";

export function AdvancedChart<T extends { x: number; y: number }>({
  className,
  width,
  height,
  items,
  smoothness,
  getLabel: inputGetLabel,
  children,
}: Props<T>) {
  return (
    <SimpleChart
      className={className}
      width={width}
      height={height}
      items={items}
      smoothness={smoothness}
    >
      <PointLabels
        inputType="spline"
        getLabel={useMemo(
          () => (sourcePoint: SourcePoint) =>
            inputGetLabel(sourcePoint.source as T),
          [inputGetLabel]
        )}
      />

      {children}
    </SimpleChart>
  );
}

interface Props<T extends { x: number; y: number }> {
  className?: string;
  width: number;
  height: number;
  items: { points: T[] }[];
  smoothness?: number;
  getLabel: (point: T) => string;
  children?: ReactNode;
}
