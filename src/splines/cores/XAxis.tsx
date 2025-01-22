import { Fragment, useMemo } from "react";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";
import { useRange } from "./useRange";
import "./XAxis.css";

export function XAxis({ className, y, labels }: Props) {
  useChartInput(
    "axis",
    useMemo(() => labels.map((label) => ({ x: label.x, y })), [labels, y])
  );

  const draw = useDraw();

  const range = useRange();
  const minimumDraw = useMemo(
    () => draw({ x: range.minimum.x, y }),
    [draw, range.minimum.x, y]
  );
  const maximumDraw = useMemo(
    () => draw({ x: range.maximum.x, y }),
    [draw, range.maximum.x, y]
  );

  const labelDraws = useMemo(
    () =>
      labels.map((label) => ({
        label,
        draw: draw({ x: label.x, y }),
      })),
    [draw, labels, y]
  );

  return (
    <div
      className={`handmadeReactChart-splines-cores-XAxis ${className ?? ""}`}
      style={{
        left: minimumDraw.x,
        top: minimumDraw.y,
        width: maximumDraw.x - minimumDraw.x,
      }}
    >
      {labelDraws.map((labelDraw, i) => (
        <Fragment key={i}>
          <div
            className="line"
            style={{ left: labelDraw.draw.x - minimumDraw.x }}
          />

          <div
            className="label"
            style={{ left: labelDraw.draw.x - minimumDraw.x }}
          >
            {labelDraw.label.text}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

interface Props {
  className?: string;
  y: number;
  labels: { x: number; text: string }[];
}
