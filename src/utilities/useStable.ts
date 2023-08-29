import { useRef } from "react";

export function useStable<T>(
  values: T[],
  match: (oldValue: T, newValue: T) => boolean
) {
  const ref = useRef<T[]>(values);

  const matched =
    values.length === ref.current.length &&
    values.every((value, i) => match(ref.current[i], value));

  if (!matched) {
    ref.current = values;
  }

  return ref.current;
}
