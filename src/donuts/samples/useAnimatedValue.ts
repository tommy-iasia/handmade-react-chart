import { useCallback } from "react";
import { useAnimated } from "../../utilities/useAnimated";

export function useAnimatedValue(inputValue: number, transition: number) {
  return useAnimated(
    inputValue,
    transition,
    useCallback(({ from, to, ratio }: State) => (to - from) * ratio + from, [])
  );
}

interface State {
  from: number;
  to: number;
  ratio: number;
}
