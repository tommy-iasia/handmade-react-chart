import { createContext, Dispatch, SetStateAction } from "react";
import { SplineAreaItem } from "./SplineAreaItem";
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
  areaItems: SplineAreaItem[];
  setAreaItems: Dispatch<SetStateAction<SplineAreaItem[]>>;

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
  areaItems: [],
  setAreaItems: () => {},

  xAxes: [],
  setXAxes: () => {},
  yAxes: [],
  setYAxes: () => {},
});
