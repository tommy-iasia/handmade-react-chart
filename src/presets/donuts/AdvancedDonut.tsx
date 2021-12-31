import { Key, ReactNode, useState } from "react";
import { Area } from "../../charts/Area";
import { Center } from "../../donuts/centers/Center";
import { DonutChart } from "../../donuts/DonutChart";
import { DonutItem } from "../../donuts/DonutItem";
import { DonutSlice } from "../../donuts/DonutSlice";
import { LabelPosition } from "../../donuts/labels/LabelPosition";
import { LabelsDrawer } from "../../donuts/labels/LabelsDrawer";
import { LabelsGenerator } from "../../donuts/labels/LabelsPositioner";
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
}: Props<T>) {
  const [entered, setEntered] = useState(true);
  const [selectedItem, setSelectedItem] = useState<DonutItem>();

  const outerSpace = Math.min(width, height) / 2 - outerRadius;

  const [labelItems, setLabelItems] = useState<LabelPosition[]>([]);

  return (
    <Area className="handmadeReactChart-presets-donuts-AdvancedDonut">
      <DonutChart
        width={width}
        height={height}
        centerX={width / 2}
        centerY={height / 2}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        transitionDuration={200}
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

        <LabelsGenerator setItems={setLabelItems} />
      </DonutChart>

      <LabelsDrawer
        radius={outerRadius + outerSpace * 0.5}
        positions={labelItems}
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
    </Area>
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
}
