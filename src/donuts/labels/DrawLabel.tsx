import { ReactNode } from "react";
import { getPoint } from "../DrawSlice";
import "./DrawLabel.css";

export function DrawLabel({
  centerX,
  centerY,
  radius,
  angle,
  children,
}: Props) {
  const point = getPoint(centerX, centerY, radius, angle);

  return (
    <div
      className={`handmadeReactChart-labels-DrawLabel ${
        angle <= 90 || angle >= 270 ? "right" : "left"
      }`}
      style={{ left: `${point.x}px`, top: `${point.y}px` }}
    >
      {children}
    </div>
  );
}

interface Props {
  centerX: number;
  centerY: number;
  radius: number;
  angle: number;
  children?: ReactNode;
}
