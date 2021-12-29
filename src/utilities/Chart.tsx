import { ReactNode } from "react";

export default function Chart({ width, height, children }: Props) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {children}
    </svg>
  );
}

interface Props {
  width: number;
  height: number;
  children?: ReactNode;
}
