import { Fragment } from "react";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";
import { useRange } from "./useRange";
import "./YAxis.css";

export function YAxis({ className, x, labels }: Props) {
  useChartInput(
    "axis",
    labels.map((label) => ({ x, y: label.y }))
  );

  const range = useRange();

  const draw = useDraw();

  if (!range) {
    return <></>;
  }

  if (!draw) {
    return <></>;
  }

  const minimumPoint = draw({ x, y: range.minimum.y });
  const maximumPoint = draw({ x, y: range.maximum.y });

  return (
    <div
      className={`handmadeReactChart-splines-cores-YAxis ${className ?? ""}`}
      style={{
        left: minimumPoint.x,
        top: maximumPoint.y,
        height: minimumPoint.y - maximumPoint.y,
      }}
    >
      {labels.map((label, i) => {
        const drawPoint = draw({ x, y: label.y });

        return (
          <Fragment key={i}>
            <div
              className="line"
              style={{ top: drawPoint.y - maximumPoint.y }}
            />

            <div
              className="label"
              style={{ top: drawPoint.y - maximumPoint.y }}
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
  x: number;
  labels: { y: number; text: string }[];
}
