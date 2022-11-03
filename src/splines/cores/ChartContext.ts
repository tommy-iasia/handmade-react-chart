import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { CoordinateInput } from "./coordinateInput";
import { PointsInput } from "./pointsInput";

export const ChartContext = createContext<{
  chartWidth: number;
  chartHeight: number;

  contentLeft: number;
  contentTop: number;
  contentWidth: number;
  contentHeight: number;

  coordinateInput: CoordinateInput;
  setCoordinateInput: Dispatch<SetStateAction<CoordinateInput>>;

  pointsInputs: PointsInput[];
  setPointsInputs: Dispatch<SetStateAction<PointsInput[]>>;

  divRef: RefObject<HTMLDivElement>;
}>({
  chartWidth: 100,
  chartHeight: 100,
  contentLeft: 0,
  contentTop: 0,
  contentWidth: 100,
  contentHeight: 100,
  coordinateInput: { includeOriginX: false, includeOriginY: false },
  setCoordinateInput: () => {},
  pointsInputs: [],
  setPointsInputs: () => {},
  divRef: { current: null },
});
