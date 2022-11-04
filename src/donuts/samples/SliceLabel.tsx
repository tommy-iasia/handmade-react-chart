import { useContext } from "react";
import { ChartContext } from "../cores/ChartContext";
import { useAngle } from "../cores/useAngle";
import "./SliceLabel.css";

export function SliceLabel({ index, pointRadius, lineLength, text }: Props) {
  const { chartWidth, centerX, centerY } = useContext(ChartContext);

  const angle = useAngle(index);
  if (!angle) {
    return <></>;
  }

  const pointAngle = (angle.from + angle.to) / 2;

  const pointX = centerX + Math.cos(pointAngle) * pointRadius;
  const pointY = centerY + Math.sin(pointAngle) * pointRadius;

  const right = pointAngle < Math.PI / 2 || pointAngle > (Math.PI * 3) / 2;

  return (
    <div
      className="handmadeReactChart-donuts-samples-SliceLabel"
      style={{
        left: right ? pointX : undefined,
        right: right ? undefined : chartWidth - pointX,
        top: pointY,
      }}
    >
      {!right && <div className="text">{text}</div>}

      <div className="point">
        <div
          className="line"
          style={{
            width: lineLength,
            transform: `rotate(${pointAngle + Math.PI}rad)`,
          }}
        ></div>
      </div>

      {right && <div className="text">{text}</div>}
    </div>
  );
}

interface Props {
  index: number;
  pointRadius: number;
  lineLength: number;
  text: string;
}
