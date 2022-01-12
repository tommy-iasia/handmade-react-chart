import React, { useContext, useEffect } from "react";
import { ChartContext } from "../../charts/ChartContext";
import { Event } from "../../charts/mouses/useMouseEvent";
import { DonutChartContext } from "../DonutChartContext";
import { DonutItem } from "../DonutItem";

export function MouseMoveSelector({ setSelectedItem }: Props) {
  const { addMouseMove } = useContext(ChartContext);

  const { items } = useContext(DonutChartContext);

  useEffect(
    () =>
      addMouseMove((event: Event) => {
        const item = items.find((item) => {
          const x = event.x - item.centerX;
          const y = event.y - item.centerY;

          if (x === 0 && y === 0) {
            return false;
          }

          const radian = Math.atan2(y, x);
          const angle = ((radian / Math.PI) * 180 + 360) % 360;

          return angle >= item.fromAngle && angle <= item.toAngle;
        });

        if (!item) {
          return;
        }

        setSelectedItem(item);
      }),
    [addMouseMove, items, setSelectedItem]
  );

  return <></>;
}

interface Props {
  setSelectedItem(item: DonutItem | undefined): void;
}
