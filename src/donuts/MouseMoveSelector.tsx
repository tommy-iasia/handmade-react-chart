import { useContext, useEffect, useState } from "react";
import { ChartContext } from "../utilities/ChartContext";
import { Event } from "../utilities/useMouseEvent";
import { DonutChartContext } from "./DonutChartContext";
import { DonutItem } from "./DonutItem";

export function MouseSelector({ setSelectedItem }: Props) {
  const { addMouseMove, removeMouseMove } = useContext(ChartContext);
  const { centerX, centerY, items } = useContext(DonutChartContext);

  const [angle, setAngle] = useState<number>();

  useEffect(() => {
    const listen = (event: Event) => {
      const x = event.x - centerX;
      const y = event.y - centerY;

      if (x === 0 && y === 0) {
        setAngle(undefined);
        return;
      }

      const radian = Math.atan2(y, x);
      const angle = ((radian / Math.PI) * 180 + 360) % 360;

      setAngle(angle);
    };

    addMouseMove(listen);

    return () => removeMouseMove(listen);
  }, [addMouseMove, removeMouseMove, centerX, centerY]);

  useEffect(() => {
    if (angle === undefined) {
      setSelectedItem(undefined);
      return;
    }

    const item = items.find(
      (item) => angle >= item.fromAngle && angle <= item.toAngle
    );

    setSelectedItem(item);
  }, [angle, items, setSelectedItem]);

  return <></>;
}

interface Props {
  setSelectedItem(item: DonutItem | undefined): void;
}
