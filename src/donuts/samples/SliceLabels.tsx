import { SliceLabel } from "./SliceLabel";

export function SliceLabels<T>({
  pointRadius,
  lineLength,
  items,
  getName,
}: Props<T>) {
  return (
    <>
      {items.map((item, i) => (
        <SliceLabel
          key={i}
          index={i}
          pointRadius={pointRadius}
          lineLength={lineLength}
          text={getName(item)}
        />
      ))}
    </>
  );
}

interface Props<T> {
  pointRadius: number;
  lineLength: number;
  items: T[];
  getName: (item: T) => string;
}
