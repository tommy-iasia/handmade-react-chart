import { Fragment } from "react";
import { useDraw } from "./useDraw";
import { usePointsInput } from "./usePointsInput";
import { useRange } from "./useRange";
import "./XAxis.css";

export function XAxis({ className, y, labels }: Props) {
  usePointsInput(
    "axis",
    labels.map((label) => ({ x: label.x, y }))
  );

  const range = useRange();

  const draw = useDraw();

  if (!range) {
    return <></>;
  }

  if (!draw) {
    return <></>;
  }

  const minimumPoint = draw({ x: range.minimum.x, y });
  const maximumPoint = draw({ x: range.maximum.x, y });

  return (
    <div
      className={`handmadeReactChart-splines-cores-XAxis ${className ?? ""}`}
      style={{
        left: minimumPoint.x,
        top: minimumPoint.y,
        width: maximumPoint.x - minimumPoint.x,
      }}
    >
      {labels.map((label, i) => {
        const drawPoint = draw({ x: label.x, y });

        return (
          <Fragment key={i}>
            <div
              className="line"
              style={{ left: drawPoint.x - minimumPoint.x }}
            />

            <div
              className="label"
              style={{ left: drawPoint.x - minimumPoint.x }}
            >
              {label.text}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

interface Props {
  className?: string;
  y: number;
  labels: { x: number; text: string }[];
}
