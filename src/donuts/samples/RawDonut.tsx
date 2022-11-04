import { ReactNode } from "react";
import { Chart } from "../cores/Chart";
import { ValueSlice } from "../cores/ValueSlice";

export function RawDonut({ className, radius, values, children }: Props) {
  return (
    <Chart
      className={className}
      chartWidth={radius * 2}
      chartHeight={radius * 2}
    >
      {values.map((value, i) => (
        <ValueSlice key={i} index={i} value={value} />
      ))}
    </Chart>
  );
}

interface Props {
  className?: string;
  radius: number;
  values: number[];
  children?: ReactNode;
}
