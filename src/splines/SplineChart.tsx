import { ReactNode, useMemo, useState } from "react";
import { Chart } from "../charts/Chart";
import { SplineAreaItem } from "./SplineAreaItem";
import { SplineAxisItem } from "./SplineAxisItem";
import { SplineChartContext } from "./SplineChartContext";
import { SplineLineItem } from "./SplineLineItem";

export function SplineChart({
  className,
  chartWidth,
  chartHeight,
  contentLeft: inputContentLeft,
  contentTop: inputContentTop,
  contentWidth: inputContentWidth,
  contentHeight: inputContentHeight,
  smoothness,
  transitionDuration,
  children,
}: Props) {
  const contentLeft =
    inputContentLeft ?? (chartWidth - (inputContentWidth ?? chartWidth)) / 2;
  const contentTop =
    inputContentTop ?? (chartHeight - (inputContentHeight ?? chartHeight)) / 2;

  const contentWidth =
    inputContentWidth ?? chartWidth - (inputContentLeft ?? 0);
  const contentHeight =
    inputContentHeight ?? chartHeight - (inputContentTop ?? 0);

  const [lineItems, setLineItems] = useState<SplineLineItem[]>([]);
  const [areaItems, setAreaItems] = useState<SplineAreaItem[]>([]);

  const [xAxes, setXAxes] = useState<SplineAxisItem[]>([]);
  const [yAxes, setYAxes] = useState<SplineAxisItem[]>([]);

  return (
    <SplineChartContext.Provider
      value={useMemo(
        () => ({
          chartWidth,
          chartHeight,
          contentLeft,
          contentTop,
          contentWidth,
          contentHeight,
          smoothness: smoothness ?? 1,
          transitionDuration: transitionDuration ?? 0,
          lineItems,
          setLineItems,
          areaItems,
          setAreaItems,
          xAxes,
          setXAxes,
          yAxes,
          setYAxes,
        }),
        [
          areaItems,
          chartHeight,
          chartWidth,
          contentHeight,
          contentLeft,
          contentTop,
          contentWidth,
          lineItems,
          smoothness,
          transitionDuration,
          xAxes,
          yAxes,
        ]
      )}
    >
      <Chart className={className} width={chartWidth} height={chartHeight}>
        {children}
      </Chart>
    </SplineChartContext.Provider>
  );
}

interface Props {
  className?: string;
  chartWidth: number;
  chartHeight: number;
  contentLeft?: number;
  contentTop?: number;
  contentWidth?: number;
  contentHeight?: number;
  smoothness?: number;
  transitionDuration?: number;
  children?: ReactNode;
}
