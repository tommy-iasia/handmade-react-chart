import { useTransitionValue } from "../charts/useTransitionValue";
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
  const animatedCenterX = useTransitionValue(centerX, transitionDuration);
  const animatedCenterY = useTransitionValue(centerY, transitionDuration);

  const animatedInnerRadius = useTransitionValue(
    innerRadius,
    transitionDuration
  );
  const animatedOuterRadius = useTransitionValue(
    outerRadius,
    transitionDuration
  );

  const animatedFromAngle = useTransitionValue(fromAngle, transitionDuration);
  const animatedToAngle = useTransitionValue(toAngle, transitionDuration);

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
