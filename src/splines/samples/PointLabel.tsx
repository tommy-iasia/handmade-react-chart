import { useContext, useMemo } from "react";
import { ChartContext } from "../cores/ChartContext";
import { useDraw } from "../cores/useDraw";
import "./PointLabel.css";

export function PointLabel({ className, x, y, text }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const draw = useDraw();
  const drawPoint = useMemo(() => draw({ x, y }), [draw, x, y]);

  const horizontal = drawPoint.x >= chartWidth / 2 ? "left" : "right";
  const vertical = drawPoint.y >= chartHeight / 2 ? "up" : "down";

  return (
    <div
      className={`handmadeReactChart-splines-samples-PointLabel ${horizontal} ${vertical} ${
        className ?? ""
      }`}
      style={{
        left: horizontal === "right" ? drawPoint.x : undefined,
        right: horizontal === "left" ? chartWidth - drawPoint.x : undefined,
        top: vertical === "down" ? drawPoint.y : undefined,
        bottom: vertical === "up" ? chartHeight - drawPoint.y : undefined,
      }}
    >
      <div className="point" />

      <div className="label">{text}</div>
    </div>
  );
}

interface Props {
  className?: string;
  x: number;
  y: number;
  text: string;
}
