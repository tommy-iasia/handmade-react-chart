import { ReactNode, useState } from "react";
import { Chart } from "../cores/Chart";
import { AnimatedSlice } from "./AnimatedSlice";
import { CenterText } from "./CenterText";
import { SelectContext } from "./SelectContext";
import { Selector } from "./Selector";

export function SimpleChart({
  className,
  radius,
  values,
  transition,
  children,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>();

  return (
    <Chart
      className={className}
      chartWidth={radius * 2}
      chartHeight={radius * 2}
    >
      <SelectContext.Provider value={{ selectedIndex, setSelectedIndex }}>
        <Selector />

        {values.map((value, i) => (
          <AnimatedSlice
            key={i}
            index={i}
            value={value}
            outerRadius={i === selectedIndex ? radius : radius * 0.9}
            transition={transition ?? 200}
          />
        ))}
      </SelectContext.Provider>

      {selectedIndex !== undefined && selectedIndex < values.length && (
        <CenterText
          width={radius * 0.8}
          height={radius * 0.8}
          text={`${values[selectedIndex]}`}
        />
      )}

      {children}
    </Chart>
  );
}

interface Props {
  className?: string;
  radius: number;
  values: number[];
  transition?: number;
  children?: ReactNode;
}
