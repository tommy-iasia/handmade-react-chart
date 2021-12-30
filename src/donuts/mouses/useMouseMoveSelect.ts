import { useContext, useEffect, useState } from "react";
import { MouseZoneContext } from "../../charts/mouses/MouseZoneContext";
import { Event } from "../../charts/mouses/useMouseEvent";
import { DonutChartContext } from "../DonutChartContext";
import { DonutItem } from "../DonutItem";

export function useMouseMoveSelect() {
  const [selected, setSelected] = useState<DonutItem>();

  const { addMouseMove } = useContext(MouseZoneContext);
  const { centerX, centerY, items } = useContext(DonutChartContext);

  const [angle, setAngle] = useState<number>();

  useEffect(
    () =>
      addMouseMove((event: Event) => {
        const x = event.x - centerX;
        const y = event.y - centerY;

        if (x === 0 && y === 0) {
          setAngle(undefined);
          return;
        }

        const radian = Math.atan2(y, x);
        const angle = ((radian / Math.PI) * 180 + 360) % 360;

        setAngle(angle);
      }),
    [addMouseMove, centerX, centerY]
  );

  useEffect(() => {
    if (angle === undefined) {
      setSelected(undefined);
      return;
    }

    const item = items.find(
      (item) => angle >= item.fromAngle && angle <= item.toAngle
    );

    setSelected(item);
  }, [angle, items]);

  return selected;
}
