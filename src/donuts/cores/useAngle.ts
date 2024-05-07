import { useContext } from "react";
import { ChartContext } from "./ChartContext";

export function useAngle(index: number) {
  const { valueInputs } = useContext(ChartContext);

  const currentInput = valueInputs.find((input) => input.index === index);

  if (!currentInput) {
    return undefined;
  }

  const totalValue = valueInputs
    .map((input) => input.value)
    .reduce((s, t) => s + t, 0);

  if (totalValue === 0) {
    return undefined;
  }

  const beforeValue = valueInputs
    .filter((input) => input.index < index)
    .map((input) => input.value)
    .reduce((s, t) => s + t, 0);

  return {
    from: ((2 * Math.PI * beforeValue) / totalValue) * 0.999998,
    to:
      ((2 * Math.PI * (beforeValue + currentInput.value)) / totalValue) *
      0.999999,
  };
}
