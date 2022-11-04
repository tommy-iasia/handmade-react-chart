import "./Grid.css";
import { useDraw } from "./useDraw";
import { useRange } from "./useRange";

export function Grid({ xs, ys }: Props) {
  const range = useRange();

  const draw = useDraw();

  if (!range) {
    return <></>;
  }

  if (!draw) {
    return <></>;
  }

  return (
    <div className="handmadeReactChart-splines-cores-Grid">
      {xs?.map((x, i) => {
        const top = draw({ x, y: range.maximum.y });
        const bottom = draw({ x, y: range.minimum.y });

        return (
          <div
            key={`vertical-${i}`}
            className="vertical"
            style={{ left: top.x, top: top.y, height: bottom.y - top.y }}
          />
        );
      })}

      {ys?.map((y, i) => {
        const left = draw({ x: range.minimum.x, y });
        const right = draw({ x: range.maximum.x, y });

        return (
          <div
            key={`horizontal-${i}`}
            className="horizontal"
            style={{ left: left.x, top: left.y, width: right.x - left.x }}
          />
        );
      })}
    </div>
  );
}

interface Props {
  xs?: number[];
  ys?: number[];
}
