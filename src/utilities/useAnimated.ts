import { useEffect, useMemo, useState } from "react";

export function useAnimated<T>(
  currentValue: T,
  transition: number,
  calculate: (state: State<T>) => T
) {
  const [state, setState] = useState<State<T>>({
    from: currentValue,
    to: currentValue,
    ratio: 1,
  });

  useEffect(
    () =>
      setState((oldState) => ({
        from: calculate(oldState),
        to: currentValue,
        ratio: 0,
      })),
    [calculate, currentValue]
  );

  useEffect(() => {
    const cancellation = { cancelled: false };

    let lastTime = performance.now();
    let frameHandler: number;

    const callback = (currentTime: DOMHighResTimeStamp) => {
      const elapsed = currentTime - lastTime;

      setTimeout(() => {
        if (cancellation.cancelled) {
          return;
        }

        setState((oldState) => {
          if (oldState.ratio < 1) {
            return {
              ...oldState,
              ratio: Math.min(oldState.ratio + elapsed / transition, 1),
            };
          } else {
            return oldState;
          }
        });
      });

      lastTime = currentTime;
      frameHandler = requestAnimationFrame(callback);
    };

    frameHandler = requestAnimationFrame(callback);
    return () => {
      cancelAnimationFrame(frameHandler);
      cancellation.cancelled = true;
    };
  }, [transition]);

  return useMemo(() => calculate(state), [calculate, state]);
}

interface State<T> {
  from: T;
  to: T;
  ratio: number;
}
