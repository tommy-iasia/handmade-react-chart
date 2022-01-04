import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

export function useTransition<T>(
  value: T,
  getOutput: (transition: Transition<T>, time: number) => T,
  transitionDuration: number
) {
  const valuesRef = useRef<Transition<T>>({
    fromValue: value,
    toValue: value,
    fromTime: Date.now(),
    transitionDuration,
  });

  const getOutputRef = useRef(getOutput);
  getOutputRef.current = getOutput;

  const [outputValue, setOutputValue] = useState(() =>
    getOutputRef.current(valuesRef.current, Date.now())
  );

  useAnimationFrame(() => {
    const outputValue = getOutputRef.current(valuesRef.current, Date.now());
    setOutputValue(outputValue);
  });

  useEffect(() => {
    const time = Date.now();
    const fromValue = getOutputRef.current(valuesRef.current, time);

    valuesRef.current = {
      fromValue,
      toValue: value,
      fromTime: time,
      transitionDuration: transitionDuration,
    };
  }, [value, transitionDuration]);

  return outputValue;
}

export interface Transition<T> {
  fromValue: T;
  toValue: T;

  fromTime: number;
  transitionDuration: number;
}
