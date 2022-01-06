import React from "react";
import { useTransitionValue } from "../../charts/useTransitionValue";
import { DrawPoint } from "./DrawPoint";

export function AnimatedPoint({
  x: inputX,
  y: inputY,
  transitionDuration,
}: Props) {
  const animatedX = useTransitionValue(inputX, transitionDuration);
  const animatedY = useTransitionValue(inputY, transitionDuration);

  return <DrawPoint x={animatedX} y={animatedY} />;
}

interface Props {
  x: number;
  y: number;
  transitionDuration: number;
}
