import { useContext, useEffect } from "react";
import { ChartContext } from "../cores/ChartContext";
import { DrawSlice } from "../cores/DrawSlice";
import { useAngle } from "../cores/useAngle";
import { useAnimatedValue } from "./useAnimatedValue";

export function AnimatedSlice({
  className,
  index,
  value,
  outerRadius: propsOuterRadius,
  transition,
}: Props) {
  const {
    centerX: chartCenterX,
    centerY: chartCenterY,
    innerRadius,
    outerRadius: chartOuterRadius,
    setValueInputs,
  } = useContext(ChartContext);

  const outputOuterRadius = useAnimatedValue(
    propsOuterRadius ?? chartOuterRadius,
    transition / 2
  );

  useEffect(() => {
    const input = { index, value };
    setValueInputs((inputs) => [...inputs, input]);

    return () => setValueInputs((inputs) => inputs.filter((t) => t !== input));
  }, [index, setValueInputs, value]);

  const angle = useAngle(index);

  const fromAngle = useAnimatedValue(angle?.from ?? 0, transition);
  const toAngle = useAnimatedValue(angle?.to ?? 0, transition);

  if (!angle) {
    return <></>;
  }

  return (
    <DrawSlice
      className={className}
      centerX={chartCenterX}
      centerY={chartCenterY}
      innerRadius={innerRadius}
      outerRadius={outputOuterRadius}
      fromAngle={fromAngle}
      toAngle={toAngle}
    />
  );
}

interface Props {
  className?: string;
  index: number;
  value: number;
  outerRadius?: number;
  transition: number;
}
