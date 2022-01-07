import React, { ReactNode, useContext } from "react";
import { DonutChartContext } from "../DonutChartContext";
import { getPoint } from "../DrawSlice";
import "./DrawLabel.css";

export function DrawLabel({
  centerX,
  centerY,
  radius: labelRadius,
  angle,
  children,
}: Props) {
  const point = getPoint(centerX, centerY, labelRadius, angle);

  const side = angle <= 90 || angle >= 270 ? "right" : "left";

  const { innerRadius, outerRadius } = useContext(DonutChartContext);
  const lineWidth = labelRadius - (outerRadius * 0.7 + innerRadius * 0.3);

  return (
    <div
      className={`handmadeReactChart-donuts-labels-DrawLabel ${side}`}
      style={{ left: `${point.x}px`, top: `${point.y}px` }}
    >
      {side === "right" && (
        <div className="point">
          <div
            className="line"
            style={{ width: lineWidth, transform: `rotate(${angle + 180}deg)` }}
          ></div>
        </div>
      )}

      <div className="content">{children}</div>

      {side === "left" && (
        <div className="point">
          <div
            className="line"
            style={{ width: lineWidth, transform: `rotate(${angle + 180}deg)` }}
          ></div>
        </div>
      )}
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
