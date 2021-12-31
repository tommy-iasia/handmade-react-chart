import { createContext } from "react";

export const ChartContext = createContext<{
  width: number;
  height: number;
}>({
  width: 0,
  height: 0,
});
