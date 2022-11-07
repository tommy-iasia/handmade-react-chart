import { useRef } from "react";

export function useJsonMemo<T>(value: T) {
  const ref = useRef<T>(value);

  if (value === ref.current) {
    return value;
  } else {
    const oldText = JSON.stringify(ref.current);
    const newText = JSON.stringify(value);

    if (oldText === newText) {
      return ref.current;
    } else {
      ref.current = value;
      return value;
    }
  }
}
