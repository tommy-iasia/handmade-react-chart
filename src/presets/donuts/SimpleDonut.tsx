import { useState } from "react";
import { Area } from "../../charts/Area";
import { Center } from "../../donuts/centers/Center";
import { DonutChart } from "../../donuts/DonutChart";
import { DonutItem } from "../../donuts/DonutItem";
import { DonutSlice } from "../../donuts/DonutSlice";
import { MouseMoveSelector } from "../../donuts/mouses/MouseMoveSelector";
import "./SimpleDonut.css";

export function SimpleDonut({ radius, values }: Props) {
  const [selectedItem, setSelectedItem] = useState<DonutItem>();

  return (
    <Area className="handmadeReactChart-presets-donuts-SimpleDonut">
      <DonutChart
        width={radius * 2}
        height={radius * 2}
        innerRadius={radius * 0.6}
        outerRadius={radius * 0.95}
        transitionDuration={200}
      >
        <>
          {values.map((value, i) => (
            <DonutSlice
              key={i}
              index={i}
              className={selectedItem?.index === i ? "selected" : undefined}
              value={value}
              outerRadius={selectedItem?.index === i ? radius : undefined}
            />
          ))}
        </>

        <MouseMoveSelector setSelectedItem={setSelectedItem} />
      </DonutChart>

      {selectedItem && <Center>{selectedItem.value}</Center>}
    </Area>
  );
}

interface Props {
  radius: number;
  values: number[];
}
