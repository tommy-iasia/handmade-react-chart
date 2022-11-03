import { useRef } from "react";

export function useJsonMemo<T>(
  value: T,
  replacer?: (key: string, value: any) => any
) {
  const ref = useRef({
    value,
    text: JSON.stringify(value, replacer),
  });

  if (value === ref.current.value) {
    return value;
  } else {
    const text = JSON.stringify(value);

    if (ref.current.text === text) {
      return ref.current.value;
    } else {
      ref.current = {
        value,
        text,
      };

      return value;
    }
  }
}
