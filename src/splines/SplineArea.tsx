import { useContext, useEffect, useMemo } from "react";
import { AnimatedArea } from "./AnimatedArea";
import { usePositioning } from "./axes/usePositioning";
import { SplineChartContext } from "./SplineChartContext";

export function SplineArea({
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
    setAreaItems,
  } = useContext(SplineChartContext);

  useEffect(() => {
    const item = { points: inputPoints };

    setAreaItems((items) => [...items, item]);

    return () => {
      setAreaItems((items) => items.filter((t) => t !== item));
    };
  }, [inputPoints, setAreaItems]);

  const positioning = usePositioning();

  const drawingPoints = useMemo(
    () =>
      inputPoints.map((point) => {
        const upperPoint = positioning(point.x, point.upperY);
        const lowerPoint = positioning(point.x, point.lowerY);

        return {
          x: upperPoint.x,
          upperY: upperPoint.y,
          lowerY: lowerPoint.y,
        };
      }),
    [inputPoints, positioning]
  );

  console.log("SplineArea", inputPoints, drawingPoints);

  return (
    <AnimatedArea
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
  points: { x: number; upperY: number; lowerY: number }[];
  smoothness?: number;
  transitionDuration?: number;
}
