import { ReactNode } from "react";
import "./DrawXAxis.css";

export function DrawXAxis({
  labels,
  contentLeft,
  contentTop,
  contentWidth,
  contentHeight,
}: Props) {
  return (
    <div className="handmadeReactChart-splines-axes-DrawXAxis">
      {labels.map((label, i) => (
        <div
          key={i}
          className="label"
          style={{ left: label.x, top: contentTop + contentHeight }}
        >
          {label.text}
        </div>
      ))}

      {labels.map((label, i) => (
        <div
          key={i}
          className="grid"
          style={{ left: label.x, top: contentTop, height: contentHeight }}
        ></div>
      ))}

      <div
        className="axis"
        style={{
          left: contentLeft,
          top: contentTop + contentHeight,
          width: contentWidth,
        }}
      ></div>
    </div>
  );
}

interface Props {
  labels: { x: number; text?: ReactNode }[];
  contentLeft: number;
  contentTop: number;
  contentWidth: number;
  contentHeight: number;
}
