import { ReactNode, useContext } from "react";
import { DonutChartContext } from "../DonutChartContext";
import { DonutItem } from "../DonutItem";
import { DrawLabel } from "./DrawLabel";

export function LabelsDrawer({ radius, getContent }: Props) {
  const { items } = useContext(DonutChartContext);

  return (
    <>
      {items.map((item, i) => (
        <DrawLabel
          key={i}
          centerX={item.centerX}
          centerY={item.centerY}
          radius={radius}
          angle={(item.fromAngle + item.toAngle) / 2}
        >
          {getContent(item)}
        </DrawLabel>
      ))}
    </>
  );
}

interface Props {
  radius: number;
  getContent(donutItem: DonutItem): ReactNode;
}
