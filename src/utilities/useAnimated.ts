import { useEffect, useReducer, useRef } from "react";

export function useAnimated<T>(
  currentValue: T,
  transition: number,
  calculate: (state: State<T>) => T
) {
  const calculateRef = useRef(calculate);
  calculateRef.current = calculate;

  const [state, dispatch] = useReducer(
    (state: State<T>, action: Action<T>) => {
      switch (action.type) {
        case "tick":
          const ratio = Math.min(state.ratio + action.ratio, 1);
          return ratio !== state.ratio ? { ...state, ratio } : state;

        case "reset":
          const value = calculateRef.current(state);

          return {
            from: value,
            to: action.value,
            ratio: 0,
          };
      }
    },
    {
      from: currentValue,
      to: currentValue,
      ratio: 1,
    }
  );

  useEffect(() => {
    let lastTime = performance.now();

    const callback = (currentTime: DOMHighResTimeStamp) => {
      dispatch({ type: "tick", ratio: (currentTime - lastTime) / transition });

      lastTime = currentTime;

      requestAnimationFrame(callback);
    };

    const handler = requestAnimationFrame(callback);

    return () => cancelAnimationFrame(handler);
  }, [transition]);

  useEffect(
    () => dispatch({ type: "reset", value: currentValue }),
    [currentValue]
  );

  return calculateRef.current(state);
}

interface State<T> {
  from: T;
  to: T;
  ratio: number;
}

type Action<T> =
  | {
      type: "tick";
      ratio: number;
    }
  | {
      type: "reset";
      value: T;
    };
