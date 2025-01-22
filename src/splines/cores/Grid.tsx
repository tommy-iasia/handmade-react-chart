import { useMemo } from "react";
import "./Grid.css";
import { useDraw } from "./useDraw";
import { useRange } from "./useRange";

export function Grid({ className, xs, ys }: Props) {
  const draw = useDraw();
  const range = useRange();

  const xDraws = useMemo(
    () =>
      xs?.map((x) => ({
        top: draw({ x, y: range.maximum.y }),
        bottom: draw({ x, y: range.minimum.y }),
      })),
    [draw, range.maximum.y, range.minimum.y, xs]
  );

  const yDraws = useMemo(
    () =>
      ys?.map((y) => ({
        left: draw({ x: range.minimum.x, y }),
        right: draw({ x: range.maximum.x, y }),
      })),
    [draw, range.minimum.x, range.maximum.x, ys]
  );

  return (
    <div className={`handmadeReactChart-splines-cores-Grid ${className ?? ""}`}>
      {xDraws?.map((xDraw, i) => (
        <div
          key={`vertical-${i}`}
          className="vertical"
          style={{
            left: xDraw.top.x,
            top: xDraw.top.y,
            height: xDraw.bottom.y - xDraw.top.y,
          }}
        />
      ))}

      {yDraws?.map((yDraw, i) => (
        <div
          key={`horizontal-${i}`}
          className="horizontal"
          style={{
            left: yDraw.left.x,
            top: yDraw.left.y,
            width: yDraw.right.x - yDraw.left.x,
          }}
        />
      ))}
    </div>
  );
}

interface Props {
  className?: string;
  xs?: number[];
  ys?: number[];
}
