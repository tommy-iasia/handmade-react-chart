import { useMemo } from "react";
import { useAnimated } from "../components";

export function useAnimatedSplineItems(
  inputItems: { points: { x: number; y: number }[] }[]
) {
  return useAnimated(
    inputItems,
    800,
    useMemo(
      () => (state) => {
        const fromItems = [...state.from];
        while (fromItems.length < state.to.length) {
          fromItems.push({ points: [] });
        }

        const toItems = [...state.to];
        while (toItems.length < fromItems.length) {
          toItems.push({ points: [] });
        }

        return fromItems.map((fromItem, i) => {
          const toItem = toItems[i];

          const fromPoints = [...fromItem.points];
          while (fromPoints.length < toItem.points.length) {
            fromPoints.push({ x: 0, y: 0 });
          }

          const toPoints = [...toItem.points];
          while (toPoints.length < fromPoints.length) {
            toPoints.push({ x: 0, y: 0 });
          }

          const outputPoints = fromPoints.map((fromPoint, i) => {
            const toPoint = toPoints[i];

            return {
              x: (toPoint.x - fromPoint.x) * state.ratio + fromPoint.x,
              y: (toPoint.y - fromPoint.y) * state.ratio + fromPoint.y,
            };
          });

          return { points: outputPoints };
        });
      },
      []
    )
  );
}
