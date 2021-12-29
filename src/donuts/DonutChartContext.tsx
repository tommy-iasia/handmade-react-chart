import { createContext, Dispatch, SetStateAction } from "react";

export const DonutChartContext = createContext<{
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  transitionDuration: number;
  items: { index: number; value: number }[];
  setItems: Dispatch<SetStateAction<{ index: number; value: number }[]>>;
}>({
  width: 0,
  height: 0,
  centerX: 0,
  centerY: 0,
  innerRadius: 0,
  outerRadius: 0,
  transitionDuration: 0,
  items: [],
  setItems: () => {},
});
