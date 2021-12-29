import { useEffect, useReducer, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

export function useTransition(
  value: number,
  transitionDuration: number,
  transitionTimingFunction?: (value: number) => number
) {
  const [values, updateValues] = useReducer(
    (values: Values, change: ChangeValue) => {
      return {
        fromValue: getOutputValue(values, change.time),
        toValue: change.value,
        fromTime: change.time,
        transitionDuration: change.transitionDuration,
      };
    },
    {
      fromValue: value,
      fromTime: Date.now(),
      toValue: value,
      transitionDuration,
    }
  );

  function getOutputValue(values: Values, time: number) {
    const elapsed = time - values.fromTime;
    const progress =
      values.transitionDuration > 0
        ? Math.min(Math.max(elapsed / values.transitionDuration, 0), 1)
        : 1;

    const ratio = transitionTimingFunction
      ? transitionTimingFunction(progress)
      : Math.pow(progress, 3);

    return (values.toValue - values.fromValue) * ratio + values.fromValue;
  }

  useEffect(() => {
    updateValues({
      value,
      time: Date.now(),
      transitionDuration,
    });
  }, [value, transitionDuration]);

  const [outputValue, setOutputValue] = useState(() =>
    getOutputValue(values, Date.now())
  );

  useAnimationFrame(() => {
    const outputValue = getOutputValue(values, Date.now());
    setOutputValue(outputValue);
  });

  return outputValue;
}

interface Values {
  fromValue: number;
  toValue: number;

  fromTime: number;
  transitionDuration: number;
}

interface ChangeValue {
  value: number;
  time: number;
  transitionDuration: number;
}
