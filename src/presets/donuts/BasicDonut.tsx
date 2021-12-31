import { ReactNode } from "react";
import { DonutChart } from "../../donuts/DonutChart";
import { DonutSlice } from "../../donuts/DonutSlice";

export function BasicDonut({
  innerRadius,
  outerRadius,
  values,
  children,
}: Props) {
  return (
    <DonutChart
      width={outerRadius * 2}
      height={outerRadius * 2}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
    >
      {values.map((value, i) => (
        <DonutSlice key={i} index={i} value={value} />
      ))}

      {children}
    </DonutChart>
  );
}

interface Props {
  innerRadius: number;
  outerRadius: number;
  values: number[];
  children?: ReactNode;
}
