import { useState } from "react";
import { Chart } from "../cores/Chart";
import { AnimatedSlice } from "./AnimatedSlice";
import { CenterText } from "./CenterText";
import { SelectContext } from "./SelectContext";
import { Selector } from "./Selector";
import { SliceLabels } from "./SliceLabels";

export function AdvancedChart<T>({
  className,
  chartWidth,
  chartHeight,
  innerRadius,
  outerRadius,
  selectedRadius,
  items,
  getKey,
  getValue,
  getName,
  getText,
  transition,
}: Props<T>) {
  const [selectedIndex, setSelectedIndex] = useState<number>();

  return (
    <Chart
      className={className}
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      innerRadius={innerRadius}
    >
      <SelectContext.Provider value={{ selectedIndex, setSelectedIndex }}>
        <Selector />

        {items.map((item, i) => (
          <AnimatedSlice
            key={getKey?.(item) || i}
            index={i}
            value={getValue(item)}
            outerRadius={i === selectedIndex ? selectedRadius : outerRadius}
            transition={transition ?? 200}
          />
        ))}
      </SelectContext.Provider>

      <SliceLabels
        pointRadius={10 + selectedRadius}
        lineLength={10 + (selectedRadius - innerRadius) / 2}
        items={items}
        getName={getName}
      />

      {selectedIndex !== undefined && (
        <CenterText
          width={innerRadius * 2 * 0.7}
          height={innerRadius * 2 * 0.7}
          text={`${getText(items[selectedIndex])}`}
        />
      )}
    </Chart>
  );
}

interface Props<T> {
  className?: string;
  chartWidth: number;
  chartHeight: number;
  innerRadius: number;
  outerRadius: number;
  selectedRadius: number;
  items: T[];
  getKey?: (item: T) => string | number;
  getValue: (item: T) => number;
  getName: (item: T) => string;
  getText: (item: T) => string;
  transition?: number;
}
