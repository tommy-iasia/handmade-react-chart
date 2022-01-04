import { createContext, Dispatch, SetStateAction } from "react";
import { SplineAxisItem } from "./SplineAxisItem";
import { SplineLineItem } from "./SplineLineItem";

export const SplineChartContext = createContext<{
  chartWidth: number;
  chartHeight: number;
  contentLeft: number;
  contentTop: number;
  contentWidth: number;
  contentHeight: number;
  smoothness: number;
  transitionDuration: number;
  lineItems: SplineLineItem[];
  setLineItems: Dispatch<SetStateAction<SplineLineItem[]>>;
  xAxes: SplineAxisItem[];
  setXAxes: Dispatch<SetStateAction<SplineAxisItem[]>>;
  yAxes: SplineAxisItem[];
  setYAxes: Dispatch<SetStateAction<SplineAxisItem[]>>;
}>({
  chartWidth: 0,
  chartHeight: 0,
  contentLeft: 0,
  contentTop: 0,
  contentWidth: 0,
  contentHeight: 0,
  smoothness: 1,
  transitionDuration: 0,
  lineItems: [],
  setLineItems: () => {},
  xAxes: [],
  setXAxes: () => {},
  yAxes: [],
  setYAxes: () => {},
});
