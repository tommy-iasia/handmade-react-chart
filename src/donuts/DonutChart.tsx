import { ReactNode, useMemo, useState } from "react";
import Chart from "../utilities/Chart";
import { DonutChartContext } from "./DonutChartContext";

export function DonutChart({
  width,
  height,
  centerX: inputCenterX,
  centerY: inputCenterY,
  innerRadius: inputInnerRadius,
  outerRadius: inputOuterRadius,
  transitionDuration,
  children,
}: Props) {
  const [items, setItems] = useState<{ index: number; value: number }[]>([]);

  const centerX = inputCenterX ?? width / 2;
  const centerY = inputCenterY ?? height / 2;

  const outerRadius =
    inputOuterRadius ??
    Math.min(centerX, width - centerX, centerY, height - centerY);

  const innerRadius = inputInnerRadius ?? outerRadius * 0.6;

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
      <Chart width={width} height={height}>
        {children}
      </Chart>
    </DonutChartContext.Provider>
  );
}

interface Props {
  width: number;
  height: number;
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  outerRadius?: number;
  transitionDuration?: number;
  children?: ReactNode;
}
