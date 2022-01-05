import { Key, ReactNode, useState } from "react";
import { Center } from "../../donuts/centers/Center";
import { DonutChart } from "../../donuts/DonutChart";
import { DonutItem } from "../../donuts/DonutItem";
import { DonutSlice } from "../../donuts/DonutSlice";
import { LabelsDrawer } from "../../donuts/labels/LabelsDrawer";
import { MouseEnterSetter } from "../../donuts/mouses/MouseEnterSetter";
import { MouseMoveSelector } from "../../donuts/mouses/MouseMoveSelector";
import "./AdvancedDonut.css";

export function AdvancedDonut<T>({
  width,
  height,
  innerRadius,
  outerRadius,
  items,
  getKey,
  getValue,
  getLabel,
  getCenter,
  transitionDuration,
  children,
}: Props<T>) {
  const [entered, setEntered] = useState(true);
  const [selectedItem, setSelectedItem] = useState<DonutItem>();

  const outerSpace = Math.min(width, height) / 2 - outerRadius;

  return (
    <DonutChart
      className="handmadeReactChart-presets-donuts-AdvancedDonut"
      width={width}
      height={height}
      centerX={width / 2}
      centerY={height / 2}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      transitionDuration={transitionDuration ?? 200}
    >
      {items.map((item, i) => (
        <DonutSlice
          key={getKey(item)}
          index={i}
          className={
            entered && selectedItem?.index === i ? "selected" : undefined
          }
          value={getValue(item)}
          outerRadius={
            entered && selectedItem?.index === i
              ? outerRadius + outerSpace * 0.3
              : undefined
          }
        />
      ))}

      <MouseEnterSetter setEntered={setEntered} />
      <MouseMoveSelector setSelectedItem={setSelectedItem} />

      <LabelsDrawer
        radius={outerRadius + outerSpace * 0.5}
        getContent={(donutItem) => {
          const inputItem = items[donutItem.index];

          if (!inputItem) {
            return undefined;
          }

          return getLabel(inputItem);
        }}
      />

      <Center className={entered && selectedItem ? "active" : undefined}>
        {selectedItem &&
          (() => {
            const item = items[selectedItem.index];

            if (!item) {
              return;
            }

            return getCenter(item);
          })()}
      </Center>

      {children}
    </DonutChart>
  );
}

interface Props<T> {
  width: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  items: T[];
  getKey(item: T): Key;
  getValue(item: T): number;
  getLabel(item: T): ReactNode;
  getCenter(item: T): ReactNode;
  transitionDuration?: number;
  children?: ReactNode;
}
