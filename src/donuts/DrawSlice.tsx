import React from "react";
import "./DrawSlice.css";

export function DrawSlice({
  className,
  width,
  height,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  fromAngle,
  toAngle,
}: Props) {
  const { x: outerFromX, y: outerFromY } = getPoint(
    centerX,
    centerY,
    outerRadius,
    fromAngle
  );

  const { x: innerFromX, y: innerFromY } = getPoint(
    centerX,
    centerY,
    innerRadius,
    fromAngle
  );

  const { x: outerToX, y: outerToY } = getPoint(
    centerX,
    centerY,
    outerRadius,
    toAngle
  );

  const { x: innerToX, y: innerToY } = getPoint(
    centerX,
    centerY,
    innerRadius,
    toAngle
  );

  const largeArcFlag = toAngle - fromAngle >= 180 ? 1 : 0;

  return (
    <svg
      className={`handmadeReactChart-donuts-DrawSlice ${className ?? ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
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
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  fromAngle: number;
  toAngle: number;
}

export function getPoint(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
) {
  const radian = (angle * Math.PI) / 180;

  var x = centerX + radius * Math.cos(radian);
  var y = centerY + radius * Math.sin(radian);

  return { x, y };
}
