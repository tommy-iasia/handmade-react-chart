import { useContext, useEffect } from "react";
import { DonutChartContext } from "../DonutChartContext";
import { LabelPosition } from "./LabelPosition";

export function LabelsGenerator({ setItems }: Props) {
  const { items: donutItems } = useContext(DonutChartContext);

  useEffect(() => {
    const labelItems = donutItems
      .map((donutItem) => {
        const labelItem: LabelPosition = {
          donutItem,
          centerX: donutItem.centerX,
          centerY: donutItem.centerY,
          angle: (donutItem.fromAngle + donutItem.toAngle) / 2,
        };

        return labelItem;
      })
      .filter((t): t is LabelPosition => !!t);

    setItems(labelItems);
  }, [donutItems, setItems]);

  return <></>;
}

interface Props {
  setItems(labelItems: LabelPosition[]): void;
}
