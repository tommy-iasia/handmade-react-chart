import { ReactNode, useMemo } from "react";
import { PointsDrawer } from "../../splines/points/PointsDrawer";
import { SplineArea } from "../../splines/SplineArea";
import { SplineChart } from "../../splines/SplineChart";
import { SplineLine } from "../../splines/SplineLine";
import { SplineLineItem } from "../../splines/SplineLineItem";
import { AdvancedCursor } from "./AdvancedCursor";
import "./AdvancedSpline.css";
import { SimpleXAxis } from "./SimpleXAxis";
import { SimpleYAxis } from "./SimpleYAxis";

export function AdvancedSpline({
  chartWidth,
  chartHeight,
  items,
  getLabel,
  transitionDuration,
}: Props) {
  const minimum = useMemo(() => {
    const ys = items.flatMap((item) => item.points).map((point) => point.y);
    return Math.min(...ys);
  }, [items]);

  return (
    <SplineChart
      className="handmadeReactChart-presets-splines-AdvancedSpline"
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      contentLeft={40}
      contentTop={5}
      contentWidth={chartWidth - 55}
      contentHeight={chartHeight - 35}
      transitionDuration={transitionDuration ?? 200}
    >
      <SimpleXAxis />
      <SimpleYAxis />

      {items.map((item, i) => (
        <SplineLine key={`line-${i}`} points={item.points} />
      ))}

      {items.map((item, i) => (
        <SplineArea
          key={`area-${i}`}
          points={item.points.map((point) => ({
            x: point.x,
            upperY: point.y,
            lowerY: Math.min(minimum, 0),
          }))}
        />
      ))}

      <PointsDrawer />

      <AdvancedCursor
        distance={30}
        getContent={(item, point, position) =>
          getLabel?.(item, point, position)
        }
      />
    </SplineChart>
  );
}

interface Props {
  chartWidth: number;
  chartHeight: number;
  items: { points: { x: number; y: number }[] }[];
  getLabel?(
    item: SplineLineItem,
    point: { x: number; y: number },
    position: { x: number; y: number }
  ): ReactNode | undefined;
  transitionDuration?: number;
}
