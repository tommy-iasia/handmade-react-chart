import React, { ReactNode } from "react";
import "./DrawYAxis.css";

export function DrawYAxis({
  labels,
  contentLeft,
  contentTop,
  contentWidth,
  contentHeight,
  axisX,
}: Props) {
  return (
    <div className="handmadeReactChart-splines-axes-DrawYAxis">
      {labels.map((label, i) => (
        <div
          key={i}
          className="label"
          style={{ left: contentLeft, top: label.y }}
        >
          {label.text}
        </div>
      ))}

      {labels.map((label, i) => (
        <div
          key={i}
          className="grid"
          style={{
            left: axisX ?? contentLeft,
            top: label.y,
            width: contentWidth,
          }}
        ></div>
      ))}

      <div
        className="axis"
        style={{
          left: axisX ?? contentLeft,
          top: contentTop,
          height: contentHeight,
        }}
      ></div>
    </div>
  );
}

interface Props {
  labels: { y: number; text?: ReactNode }[];
  contentLeft: number;
  contentTop: number;
  contentWidth: number;
  contentHeight: number;
  axisX?: number;
}
