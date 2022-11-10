import { useContext } from "react";
import { ChartContext } from "./ChartContext";
import "./DrawSlice.css";

export function DrawSlice({
  className,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  fromAngle,
  toAngle,
}: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const outerFromX = centerX + outerRadius * Math.cos(fromAngle);
  const outerFromY = centerY + outerRadius * Math.sin(fromAngle);

  const outerToX = centerX + outerRadius * Math.cos(toAngle);
  const outerToY = centerY + outerRadius * Math.sin(toAngle);

  const innerFromX = centerX + innerRadius * Math.cos(fromAngle);
  const innerFromY = centerY + innerRadius * Math.sin(fromAngle);

  const innerToX = centerX + innerRadius * Math.cos(toAngle);
  const innerToY = centerY + innerRadius * Math.sin(toAngle);

  const largeArcFlag = toAngle - fromAngle >= Math.PI ? 1 : 0;

  return (
    <svg
      className={`handmadeReactChart-donuts-cores-DrawSlice ${className ?? ""}`}
      width={chartWidth}
      height={chartHeight}
    >
      <path
        d={`M ${outerFromX} ${outerFromY}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerToX} ${outerToY}
            L ${innerToX} ${innerToY}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerFromX} ${innerFromY}
            Z`}
      />
    </svg>
  );
}

interface Props {
  className?: string;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  fromAngle: number;
  toAngle: number;
}
