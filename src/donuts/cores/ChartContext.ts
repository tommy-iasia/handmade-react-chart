import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { ValueInput } from "./valueInput";

export const ChartContext = createContext<{
  chartWidth: number;
  chartHeight: number;

  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;

  valueInputs: ValueInput[];
  setValueInputs: Dispatch<SetStateAction<ValueInput[]>>;

  divRef: RefObject<HTMLDivElement>;
}>({
  chartWidth: 100,
  chartHeight: 100,
  centerX: 0,
  centerY: 0,
  innerRadius: 100,
  outerRadius: 100,
  valueInputs: [],
  setValueInputs: () => {},
  divRef: { current: null },
});
