import { useContext, useEffect, useMemo } from "react";
import { AnimatedSlice } from "./AnimatedSlice";
import { DonutChartContext } from "./DonutChartContext";

export function DonutSlice({
  className,
  index,
  value,
  centerX: inputCenterX,
  centerY: inputCenterY,
  innerRadius: inputInnerRadius,
  outerRadius: inputOuterRadius,
  fromAngle: inputFromAngle,
  toAngle: inputToAngle,
}: Props) {
  const {
    centerX: chartCenterX,
    centerY: chartCenterY,
    innerRadius: chartInnerRadius,
    outerRadius: chartOuterRadius,
    items,
    setItems,
  } = useContext(DonutChartContext);

  const sliceItem = useMemo(() => ({ index, value }), [index, value]);

  useEffect(() => {
    setItems((items) => [...items, sliceItem]);

    return () => {
      setItems((items) => items.filter((t) => t !== sliceItem));
    };
  }, [sliceItem, setItems]);

  const totalValue = items.map((t) => t.value).reduce((s, t) => s + t, 0);
  const sliceAngle = totalValue > 0 ? (value / totalValue) * 360 : 0;

  const beforeValue = items
    .filter((t) => t.index < index)
    .map((t) => t.value)
    .reduce((s, t) => s + t, 0);
  const beforeAngle = totalValue > 0 ? (beforeValue / totalValue) * 360 : 0;

  return (
    <AnimatedSlice
      className={className}
      centerX={inputCenterX ?? chartCenterX}
      centerY={inputCenterY ?? chartCenterY}
      innerRadius={inputInnerRadius ?? chartInnerRadius}
      outerRadius={inputOuterRadius ?? chartOuterRadius}
      fromAngle={inputFromAngle ?? beforeAngle}
      toAngle={inputToAngle ?? beforeAngle + sliceAngle}
      transitionDuration={500}
    />
  );
}

interface Props {
  className?: string;
  index: number;
  value: number;
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  outerRadius?: number;
  fromAngle?: number;
  toAngle?: number;
}
