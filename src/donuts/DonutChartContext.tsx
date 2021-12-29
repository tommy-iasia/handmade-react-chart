import { createContext, Dispatch, SetStateAction } from "react";
import { DonutItem } from "./DonutItem";

export const DonutChartContext = createContext<{
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  transitionDuration: number;
  items: DonutItem[];
  setItems: Dispatch<SetStateAction<DonutItem[]>>;
}>({
  centerX: 0,
  centerY: 0,
  innerRadius: 0,
  outerRadius: 0,
  transitionDuration: 0,
  items: [],
  setItems: () => {},
});
