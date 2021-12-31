import { ReactNode } from "react";
import { DonutItem } from "../DonutItem";
import { DrawLabel } from "./DrawLabel";
import { LabelPosition } from "./LabelPosition";

export function LabelsDrawer({ radius, positions, getContent }: Props) {
  return (
    <>
      {positions.map((position, i) => (
        <DrawLabel
          key={i}
          centerX={position.centerX}
          centerY={position.centerY}
          radius={radius}
          angle={position.angle}
        >
          {getContent(position.donutItem)}
        </DrawLabel>
      ))}
    </>
  );
}

interface Props {
  radius: number;
  positions: LabelPosition[];
  getContent(donutItem: DonutItem): ReactNode;
}
