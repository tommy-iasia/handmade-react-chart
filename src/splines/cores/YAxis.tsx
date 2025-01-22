import { Fragment, useMemo } from "react";
import { useChartInput } from "./useChartInput";
import { useDraw } from "./useDraw";
import { useRange } from "./useRange";
import "./YAxis.css";

export function YAxis({ className, x, labels }: Props) {
  useChartInput(
    "axis",
    useMemo(() => labels.map((label) => ({ x, y: label.y })), [labels, x])
  );

  const draw = useDraw();

  const range = useRange();
  const minimumDraw = useMemo(
    () => draw({ x, y: range.minimum.y }),
    [draw, range.minimum.y, x]
  );
  const maximumDraw = useMemo(
    () => draw({ x, y: range.maximum.y }),
    [draw, range.maximum.y, x]
  );

  const labelDraws = useMemo(
    () =>
      labels.map((label) => ({
        label,
        draw: draw({ x, y: label.y }),
      })),
    [draw, labels, x]
  );

  return (
    <div
      className={`handmadeReactChart-splines-cores-YAxis ${className ?? ""}`}
      style={{
        left: minimumDraw.x,
        top: maximumDraw.y,
        height: minimumDraw.y - maximumDraw.y,
      }}
    >
      {labelDraws.map((labelDraw, i) => (
        <Fragment key={i}>
          <div
            className="line"
            style={{ top: labelDraw.draw.y - maximumDraw.y }}
          />

          <div
            className="label"
            style={{ top: labelDraw.draw.y - maximumDraw.y }}
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
  x: number;
  labels: { y: number; text: string }[];
}
