import { useContext, useEffect, useMemo } from "react";
import { AnimatedLine } from "./AnimatedLine";
import { usePositioning } from "./axes/usePositioning";
import { SplineChartContext } from "./SplineChartContext";

export function SplineLine({
  className,
  points: inputPoints,
  smoothness: inputSmoothness,
  transitionDuration: inputTransitionDuration,
}: Props) {
  const {
    chartWidth,
    chartHeight,
    smoothness: chartSmoothness,
    transitionDuration: chartTransitionDuration,
    setLineItems,
  } = useContext(SplineChartContext);

  useEffect(() => {
    const item = { points: inputPoints };

    setLineItems((items) => [...items, item]);

    return () => {
      setLineItems((items) => items.filter((t) => t !== item));
    };
  }, [inputPoints, setLineItems]);

  const positioning = usePositioning();

  const drawingPoints = useMemo(
    () => inputPoints.map((point) => positioning(point.x, point.y)),
    [inputPoints, positioning]
  );

  return (
    <AnimatedLine
      className={className}
      width={chartWidth}
      height={chartHeight}
      points={drawingPoints}
      smoothness={inputSmoothness ?? chartSmoothness}
      transitionDuration={inputTransitionDuration ?? chartTransitionDuration}
    />
  );
}

interface Props {
  className?: string;
  points: { x: number; y: number }[];
  smoothness?: number;
  transitionDuration?: number;
}
