import { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../charts/AreaContext";
import { Event } from "../../charts/useMouseEvent";
import { DonutChartContext } from "../DonutChartContext";
import { DonutItem } from "../DonutItem";

export function MouseMoveSelector({ setSelectedItem }: Props) {
  const { addMouseMove } = useContext(AreaContext);

  const [mouseX, setMouseX] = useState<number>();
  const [mouseY, setMouseY] = useState<number>();

  useEffect(
    () =>
      addMouseMove((event: Event) => {
        setMouseX(event.x);
        setMouseY(event.y);
      }),
    [addMouseMove]
  );

  const { items } = useContext(DonutChartContext);

  useEffect(() => {
    if (mouseX === undefined || mouseY === undefined) {
      return;
    }

    const item = items.find((item) => {
      const x = mouseX - item.centerX;
      const y = mouseY - item.centerY;

      if (x === 0 && y === 0) {
        return false;
      }

      const radian = Math.atan2(y, x);
      const angle = ((radian / Math.PI) * 180 + 360) % 360;

      return angle >= item.fromAngle && angle <= item.toAngle;
    });

    setSelectedItem(item);
  }, [items, mouseX, mouseY, setSelectedItem]);

  return <></>;
}

interface Props {
  setSelectedItem(item: DonutItem | undefined): void;
}
