import { useLayoutEffect, useRef } from "react";

export function useAnimationFrame(callback: () => void) {
  const ref = useRef<() => void>(() => {});
  ref.current = callback;

  useLayoutEffect(() => {
    let callback = () => {};

    let requested = window.requestAnimationFrame(() => callback());

    callback = () => {
      requested = window.requestAnimationFrame(() => callback());

      ref.current();
    };

    return () => {
      window.cancelAnimationFrame(requested);
    };
  }, []);
}
