import { useContext, useEffect } from "react";
import { ChartContext } from "../cores/ChartContext";
import { SelectContext } from "./SelectContext";

export function Selector() {
  const { centerX, centerY, innerRadius, valueInputs, divRef } =
    useContext(ChartContext);

  const { setSelectedIndex } = useContext(SelectContext);

  useEffect(() => {
    const { current } = divRef;
    if (!current) {
      return;
    }

    if (valueInputs.length <= 0) {
      return;
    }

    const listener = (event: PointerEvent) => {
      if (valueInputs.length <= 1) {
        setSelectedIndex(0);
        return;
      }

      const x = event.offsetX - centerX;
      const y = event.offsetY - centerY;

      const distance = Math.sqrt(x * x + y * y);
      if (distance < innerRadius) {
        return;
      }

      const angle = Math.atan2(y, x);

      const rawRatio = angle / (2 * Math.PI);
      const positiveRatio = rawRatio >= 0 ? rawRatio : 1 + rawRatio;

      const totalValue = valueInputs
        .map((input) => input.value)
        .reduce((s, t) => s + t, 0);

      const pointerValue = totalValue * positiveRatio;
      let remainingValue = pointerValue;

      const sortedInputs = [...valueInputs].sort((a, b) => a.index - b.index);
      while (sortedInputs.length > 0) {
        const currentInput = sortedInputs.shift();

        remainingValue -= currentInput?.value ?? 0;

        if (remainingValue <= 0) {
          setSelectedIndex(currentInput?.index);
          break;
        }
      }
    };

    current.addEventListener("pointermove", listener);
    return () => current.removeEventListener("pointermove", listener);
  }, [centerX, centerY, divRef, innerRadius, setSelectedIndex, valueInputs]);

  return <></>;
}
