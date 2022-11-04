import { useContext } from "react";
import { ChartContext } from "../cores/ChartContext";
import { useDraw } from "../cores/useDraw";
import "./PointLabel.css";

export function PointLabel({ x: inputX, y: inputY, text }: Props) {
  const { chartWidth, chartHeight } = useContext(ChartContext);

  const draw = useDraw();

  if (!draw) {
    return <></>;
  }

  const { x: drawX, y: drawY } = draw({ x: inputX, y: inputY });

  const horizontal = drawX >= chartWidth / 2 ? "left" : "right";
  const vertical = drawY >= chartHeight / 2 ? "up" : "down";

  return (
    <div
      className={`handmadeReactChart-splines-samples-PointLabel ${horizontal} ${vertical}`}
      style={{
        left: horizontal === "right" ? drawX : undefined,
        right: horizontal === "left" ? chartWidth - drawX : undefined,
        top: vertical === "down" ? drawY : undefined,
        bottom: vertical === "up" ? chartHeight - drawY : undefined,
      }}
    >
      <div className="point" />

      <div className="label">{text}</div>
    </div>
  );
}

interface Props {
  x: number;
  y: number;
  text: string;
}
