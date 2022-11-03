import { ReactNode, useMemo, useRef, useState } from "react";
import "./Chart.css";
import { ChartContext } from "./ChartContext";
import { ValueInput } from "./valueInput";

export function Chart({
  className,
  chartWidth,
  chartHeight,
  centerX: inputCenterX,
  centerY: inputCenterY,
  innerRadius,
  outerRadius: inputOuterRadius,
  children,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const outputCenterX = inputCenterX ?? chartWidth / 2;
  const outputCenterY = inputCenterY ?? chartHeight / 2;

  const outputOuterRadius =
    inputOuterRadius ??
    Math.min(
      outputCenterX,
      outputCenterY,
      chartWidth - outputCenterX,
      chartHeight - outputCenterY
    );

  const [valueInputs, setValueInputs] = useState<ValueInput[]>([]);

  const context = useMemo(
    () => ({
      chartWidth,
      chartHeight,
      centerX: outputCenterX,
      centerY: outputCenterY,
      innerRadius: innerRadius ?? outputOuterRadius * 0.6,
      outerRadius: outputOuterRadius,
      valueInputs,
      setValueInputs,
      divRef,
    }),
    [
      chartHeight,
      chartWidth,
      innerRadius,
      outputCenterX,
      outputCenterY,
      outputOuterRadius,
      valueInputs,
    ]
  );

  return (
    <div
      className={`handmadeReactChart-donuts-cores-Chart ${className ?? ""}`}
      style={{ width: chartWidth, height: chartHeight }}
      ref={divRef}
    >
      <ChartContext.Provider value={context}>{children}</ChartContext.Provider>
    </div>
  );
}

interface Props {
  className?: string;
  chartWidth: number;
  chartHeight: number;
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  outerRadius?: number;
  children: ReactNode;
}
