import { SplineChart } from "../../splines/SplineChart";
import { SplineLine } from "../../splines/SplineLine";

export function RawSpline({
  width,
  height,
  values,
  smoothness,
  transitionDuration,
}: Props) {
  return (
    <SplineChart
      chartWidth={width}
      chartHeight={height}
      contentTop={2}
      contentHeight={height - 4}
      smoothness={smoothness}
      transitionDuration={transitionDuration}
    >
      <SplineLine points={values.map((y, x) => ({ x, y }))}></SplineLine>
    </SplineChart>
  );
}

interface Props {
  width: number;
  height: number;
  values: number[];
  smoothness?: number;
  transitionDuration?: number;
}
