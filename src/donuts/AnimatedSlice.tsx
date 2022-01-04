import { useTransitionValue } from "../charts/useTransitionValue";
import { DrawSlice } from "./DrawSlice";

export function AnimatedSlice({
  className,
  width,
  height,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  fromAngle,
  toAngle,
  transitionDuration,
}: Props) {
  const animatedWidth = useTransitionValue(width, transitionDuration);
  const animatedHeight = useTransitionValue(height, transitionDuration);

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
      width={animatedWidth}
      height={animatedHeight}
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
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  fromAngle: number;
  toAngle: number;
  transitionDuration: number;
}
