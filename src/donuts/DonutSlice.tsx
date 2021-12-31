import { useContext, useEffect } from "react";
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
  transitionDuration: inputTransitionDuration,
}: Props) {
  const {
    centerX: chartCenterX,
    centerY: chartCenterY,
    innerRadius: chartInnerRadius,
    outerRadius: chartOuterRadius,
    transitionDuration: chartTransitionDuration,
    items,
    setItems,
  } = useContext(DonutChartContext);

  const centerX = inputCenterX ?? chartCenterX;
  const centerY = inputCenterY ?? chartCenterY;

  const innerRadius = inputInnerRadius ?? chartInnerRadius;
  const outerRadius = inputOuterRadius ?? chartOuterRadius;

  const totalValue = items.map((t) => t.value).reduce((s, t) => s + t, 0);

  const fromAngle =
    inputFromAngle ??
    (() => {
      const beforeValue = items
        .filter((t, i) => (t.index ?? i) < index)
        .map((t) => t.value)
        .reduce((s, t) => s + t, 0);

      return totalValue > 0 ? (beforeValue / totalValue) * 360 : 0;
    })();

  const toAngle =
    inputToAngle ??
    (() => {
      const sliceAngle = totalValue > 0 ? (value / totalValue) * 360 : 0;
      return Math.min(fromAngle + sliceAngle, 360);
    })();

  useEffect(() => {
    const item = {
      index,
      value,
      centerX,
      centerY,
      innerRadius,
      outerRadius,
      fromAngle,
      toAngle,
    };

    setItems((items) => [...items, item]);

    return () => {
      setItems((items) => items.filter((t) => t !== item));
    };
  }, [
    index,
    value,
    fromAngle,
    toAngle,
    setItems,
    centerX,
    centerY,
    innerRadius,
    outerRadius,
  ]);

  return (
    <AnimatedSlice
      className={className}
      centerX={centerX}
      centerY={centerY}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      fromAngle={fromAngle}
      toAngle={toAngle}
      transitionDuration={inputTransitionDuration ?? chartTransitionDuration}
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
  transitionDuration?: number;
}
