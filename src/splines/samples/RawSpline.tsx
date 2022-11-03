import { useMemo } from "react";
import { Chart } from "../cores/Chart";
import { Spline } from "../cores/Spline";

export function RawSpline({ className, width, height, values }: Props) {
  const points = useMemo(
    () => values.map((value, i) => ({ x: i, y: value })),
    [values]
  );

  return (
    <Chart
      className={className}
      chartWidth={width}
      chartHeight={height}
      contentLeft={2}
      contentRight={2}
      contentTop={2}
      contentBottom={2}
    >
      <Spline points={points} />
    </Chart>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  values: number[];
}
