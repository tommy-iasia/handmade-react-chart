import { ReactNode, useRef, useState } from "react";
import "./Chart.css";
import { ChartContext } from "./ChartContext";
import { CoordinateInput } from "./coordinateInput";
import { PointsInput } from "./pointsInput";

export function Chart({
  className,
  chartWidth,
  chartHeight,
  contentLeft,
  contentWidth,
  contentRight,
  contentTop,
  contentHeight,
  contentBottom,
  children,
}: Props) {
  const [coordinateInput, setCoordinateInput] = useState<CoordinateInput>({
    includeOriginX: false,
    includeOriginY: false,
  });

  const [pointsInputs, setPointsInputs] = useState<PointsInput[]>([]);

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`handmadeReactChart-splines-cores-Chart ${className ?? ""}`}
      style={{ width: chartWidth, height: chartHeight }}
      ref={divRef}
    >
      <ChartContext.Provider
        value={{
          chartWidth,
          chartHeight,
          contentLeft: contentLeft ?? 0,
          contentTop: contentTop ?? 0,
          contentWidth:
            contentWidth ??
            chartWidth - (contentLeft ?? 0) - (contentRight ?? 0),
          contentHeight:
            contentHeight ??
            chartHeight - (contentTop ?? 0) - (contentBottom ?? 0),
          coordinateInput,
          setCoordinateInput,
          pointsInputs,
          setPointsInputs,
          divRef,
        }}
      >
        {children}
      </ChartContext.Provider>
    </div>
  );
}

interface Props {
  className?: string;
  chartWidth: number;
  chartHeight: number;
  contentLeft?: number;
  contentWidth?: number;
  contentRight?: number;
  contentTop?: number;
  contentHeight?: number;
  contentBottom?: number;
  children: ReactNode;
}
