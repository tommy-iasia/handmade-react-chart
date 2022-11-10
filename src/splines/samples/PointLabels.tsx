import { Point } from "../cores/point";
import { Item } from "./item";
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
            text={getLabel(point, item)}
          />
        ))
      )}
    </>
  );
}

interface Props {
  items: Item[];
  getLabel: (point: Point, item: Item) => string;
}
