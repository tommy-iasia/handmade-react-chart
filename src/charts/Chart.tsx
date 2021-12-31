import { ReactNode, useMemo } from "react";
import { ChartContext } from "./ChartContext";

export default function Chart({ className, width, height, children }: Props) {
  return (
    <ChartContext.Provider
      value={useMemo(() => ({ width, height }), [height, width])}
    >
      <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {children}
      </svg>
    </ChartContext.Provider>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  children?: ReactNode;
}
