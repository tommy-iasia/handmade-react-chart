import { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";
import { DrawSlice } from "./DrawSlice";
import { useAngle } from "./useAngle";

export function ValueSlice({
  index,
  value,
  innerRadius: propsInnerRadius,
  outerRadius: propsOuterRadius,
}: Props) {
  const {
    centerX,
    centerY,
    innerRadius: chartInnerRadius,
    outerRadius: chartOuterRadius,
    setValueInputs,
  } = useContext(ChartContext);

  useEffect(() => {
    const input = { index, value };
    setValueInputs((inputs) => [...inputs, input]);

    return () => setValueInputs((inputs) => inputs.filter((t) => t !== input));
  }, [index, setValueInputs, value]);

  const angle = useAngle(index);

  if (!angle) {
    return <></>;
  }

  return (
    <DrawSlice
      centerX={centerX}
      centerY={centerY}
      innerRadius={propsInnerRadius ?? chartInnerRadius}
      outerRadius={propsOuterRadius ?? chartOuterRadius}
      fromAngle={angle.from}
      toAngle={angle.to}
    />
  );
}

interface Props {
  index: number;
  value: number;
  innerRadius?: number;
  outerRadius?: number;
}
