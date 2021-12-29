import { useTransition } from "../utilities/useTransition";
import { DrawSlice } from "./DrawSlice";

export function AnimatedSlice({
  className,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  fromAngle,
  toAngle,
  transitionDuration,
}: Props) {
  const animatedCenterX = useTransition(centerX, transitionDuration);
  const animatedCenterY = useTransition(centerY, transitionDuration);

  const animatedInnerRadius = useTransition(innerRadius, transitionDuration);
  const animatedOuterRadius = useTransition(outerRadius, transitionDuration);

  const animatedFromAngle = useTransition(fromAngle, transitionDuration);
  const animatedToAngle = useTransition(toAngle, transitionDuration);

  return (
    <DrawSlice
      className={className}
      centerX={animatedCenterX}
      centerY={animatedCenterY}
      innerRadius={animatedInnerRadius}
      outerRadius={animatedOuterRadius}
      fromAngle={animatedFromAngle}
      toAngle={animatedToAngle}
    />
  );
}

interface Props {
  className?: string;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  fromAngle: number;
  toAngle: number;
  transitionDuration: number;
}
