import { Point } from "../cores/point";
import { PointLabel } from "./PointLabel";

export function PointLabels({ items, getLabel }: Props) {
  return (
    <>
      {items.flatMap((item, i) =>
        item.points.map((point, j) => (
          <PointLabel
            key={`${i}-${j}`}
            x={point.x}
            y={point.y}
            text={getLabel(point)}
          />
        ))
      )}
    </>
  );
}

interface Props {
  items: { points: Point[] }[];
  getLabel: (point: Point) => string;
}
