import { useMemo } from "react";
import { useAnimated } from "../../utilities/useAnimated";

export function useAnimatedValue(inputValue: number, transition: number) {
  const calculate = useMemo(
    () =>
      ({ from, to, ratio }: State) =>
        (to - from) * ratio + from,
    []
  );

  return useAnimated(inputValue, transition, calculate);
}

interface State {
  from: number;
  to: number;
  ratio: number;
}
