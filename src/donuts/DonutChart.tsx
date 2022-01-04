import { ReactNode, useMemo, useState } from "react";
import { Chart } from "../charts/Chart";
import { DonutChartContext } from "./DonutChartContext";
import { DonutItem } from "./DonutItem";

export function DonutChart({
  className,
  width,
  height,
  centerX: inputCenterX,
  centerY: inputCenterY,
  innerRadius: inputInnerRadius,
  outerRadius: inputOuterRadius,
  transitionDuration,
  children,
}: Props) {
  const centerX = inputCenterX ?? width / 2;
  const centerY = inputCenterY ?? height / 2;

  const outerRadius =
    inputOuterRadius ??
    Math.min(centerX, width - centerX, centerY, height - centerY);

  const innerRadius = inputInnerRadius ?? outerRadius * 0.6;

  const [items, setItems] = useState<DonutItem[]>([]);

  return (
    <DonutChartContext.Provider
      value={useMemo(
        () => ({
          width,
          height,
          centerX,
          centerY,
          innerRadius,
          outerRadius,
          transitionDuration: transitionDuration ?? 0,
          items,
          setItems,
        }),
        [
          width,
          height,
          centerX,
          centerY,
          innerRadius,
          outerRadius,
          transitionDuration,
          items,
        ]
      )}
    >
      <Chart className={className} width={width} height={height}>
        {children}
      </Chart>
    </DonutChartContext.Provider>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  outerRadius?: number;
  transitionDuration?: number;
  children?: ReactNode;
}
